import { WebSocket, WebSocketServer } from 'ws';

export class OverlayManager {
    private server?: WebSocketServer;
    private isReady = false;
    private readonly clients = new Set<WebSocket>();

    start(options: { port: number }): void {
        this.server = new WebSocketServer({ port: options.port });
        this.server.on('connection', (ws) => {
            this.clients.add(ws);

            ws.on('close', () => {
                this.clients.delete(ws);
            });
        });

        this.server.on('listening', () => {
            this.isReady = true;
        })
    }

    addViewers(usernames: string[]): void {
        if (!this.isReady) {
            console.warn('Tried to message overlay before WebSocket server was ready');
            return;
        }

        const message = JSON.stringify({
            type: 'addViewers',
            usernames,
        });

        for (const client of this.clients) {
            client.send(message);
        }
    }
}
