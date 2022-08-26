/** Redirect URI configured in Twitch for this application's client ID. */
const OAUTH_REDIRECT_URI = 'https://twitch-boba.web.app';

/**
 * Client ID for this registered Twitch application.
 * 
 * This is not the same as the extension client ID; for some reason Twitch
 * makes you define an "application" anyway.
 */
const OAUTH_CLIENT_ID = 'bz6gycujcnbnw2vvm615omfg7ptgjm';

/** URI for Twitch's OAuth 2.0 flow. */
const TWITCH_AUTHORIZE_URI = 'https://id.twitch.tv/oauth2/authorize';

/**
 * Namespace for Twitch OAuth 2.0 operations for this application.
 * 
 * https://dev.twitch.tv/docs/authentication
 */
export namespace oauth {
    /**
     * The handle to the OAuth popup window, or undefined if not waiting
     * for the popup window to respond.
     */
    let popupWindow: Window | undefined | null;

    /** The current OAuth 2.0 token. May be invalid. */
    let token: string | undefined;

    /** The list of scopes enabled for the current {@link token}. */
    let scopes: string[] = [];

    /**
     * Starts the OAuth 2.0 flow to refresh the current token for the
     * requested scopes.
     * 
     * Valid scopes can be found at
     * https://dev.twitch.tv/docs/authentication/scopes
     */
    export function refreshToken(scopes: string[]): void {
        // Stop any existing OAuth 2.0 flow.
        popupWindow?.close();

        const scopesString = scopes.join(' ');

        popupWindow = window.open(
            TWITCH_AUTHORIZE_URI
            + `?client_id=${OAUTH_CLIENT_ID}`
            + `&redirect_uri=${OAUTH_REDIRECT_URI}`
            + '&response_type=token'
            + `&scope=${encodeURIComponent(scopesString)}`,
            '_blank',
            'popup');
            
        if (!popupWindow) {
            console.error('Failed to open OAuth popup window!');
            return;
        }

        // Note: if we never receive the correct message, this listener will
        // never be removed. But this doesn't really matter. We can add
        // timeouts and retries later.
        window.addEventListener('message', receiveWindowMessage);
    }

    function receiveWindowMessage(evt: MessageEvent<any>) {
        if (evt.origin !== OAUTH_REDIRECT_URI) return;
        if (!popupWindow || evt.source !== popupWindow) {
            console.warn('OAuth message event listener received message from'
                + ' correct origin but with an invalid source');
            return;
        }
        
        // Clear `popupWindow` to indicate the OAuth flow is done.
        popupWindow = undefined;

        // Stop listening to 'message' events; we don't need it anymore.
        window.removeEventListener('message', receiveWindowMessage);

        const [access_token, scope] = JSON.parse(evt.data);
        token = access_token;
        scopes = decodeURIComponent(scope).split(' ');

        console.log(
            `Authorized successfully! access_token: ${access_token}`
            + ` scopes: ${scopes}`);
    }
}
