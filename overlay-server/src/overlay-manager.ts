import { WebSocket, WebSocketServer } from 'ws';

export class OverlayManager {
    private _server?: WebSocketServer;
    private _isReady = false;
    private readonly _clients = new Set<WebSocket>();

    private readonly _addedViewers = new Set<string>();
    private _inactiveViewers = new Set<string>();
    private _activeViewers = new Set<string>();

    start(options: { port: number }): void {
        this._server = new WebSocketServer({ port: options.port });
        this._server.on('connection', (ws) => {
            this._clients.add(ws);

            ws.on('close', () => {
                this._clients.delete(ws);
            });
        });

        this._server.on('listening', () => {
            this._isReady = true;
        });

        setInterval(() => {
            this.updateActiveUsers();
        }, 10000);
    }

    viewerIsActive(username: string): void {
        this._inactiveViewers.delete(username);
        this._activeViewers.add(username);
    }

    private updateActiveUsers(): void {
        const usersToAdd = new Set<string>();
        for (const user of this._activeViewers) {
            if (!this._addedViewers.has(user)) {
                usersToAdd.add(user);
                this._addedViewers.add(user);
            }
        }

        for (const user of this._inactiveViewers) {
            this._addedViewers.delete(user);
        }

        this.sendUpdateViewers({
            remove: Array.from(this._inactiveViewers),
            add: Array.from(usersToAdd),
        });

        this._inactiveViewers = this._activeViewers;
        this._activeViewers = new Set();
    }

    private sendUpdateViewers(updates: {
        remove: string[],
        add: string[],
    }): void {
        if (updates.remove.length === 0 && updates.add.length === 0) return;

        this.sendToAll({
            type: 'updateViewers',
            data: { add: updates.add, remove: updates.remove },
        });
    }

    private sendToAll(message: object): void {
        if (!this._isReady) {
            console.warn('Tried to message overlay before WebSocket server was ready');
            return;
        }

        const serialized = JSON.stringify(message);
        console.log(`Sending ${serialized}`);
        for (const client of this._clients) {
            client.send(serialized);
        }
    }
}
