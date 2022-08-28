import tmi from 'tmi.js';

import { OverlayManager } from './overlay-manager';

export class Chatbot {
    private _listener?: ChannelListener;

    constructor(private readonly _overlayManager: OverlayManager) { }

    /** 
     * Starts listening to a new channel with the given access token.
     * 
     * This stops any previous connections.
     */
    startNew(params: {
        accessToken: string,
        channel: string,
    }): void {
        if (this._listener) {
            this._listener.disconnect();
        }

        const client = new tmi.Client({
            options: {
                clientId: 'bz6gycujcnbnw2vvm615omfg7ptgjm',
                debug: true,
            },
            connection: {
                reconnect: true,
            },
            identity: {
                username: 'timoffex',
                password: `oauth:${params.accessToken}`,
            },
            channels: [params.channel],
        });

        this._listener = new ChannelListener(client, this._overlayManager);
        this._listener.connect();
    }
}

class ChannelListener {
    private _stopped = false;

    constructor(
        private readonly _client: tmi.Client,
        private readonly _overlayManager: OverlayManager) { }

    connect(): void {
        if (this._stopped) {
            console.error('Tried to connect a stopped ChannelListener');
            return;
        }

        this._client.connect().then(() => {
            if (this._stopped) return;

            console.log('Chatbot connected!');

            this._client.on('message', (_channel, userstate, _message, _self) => {
                if (userstate.username) {
                    this._overlayManager.viewerIsActive(userstate.username);
                }
            });
        });
    }

    disconnect(): void {
        this._stopped = true;
        this._client.disconnect();
    }
}