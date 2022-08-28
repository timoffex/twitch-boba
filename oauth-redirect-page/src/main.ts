const message = document.createElement('p');
message.innerHTML = 'Wrapping up... If you still see this, something is wrong.';
document.body.appendChild(message);

let addedRetryButton = false;

function showRetryButton() {
    if (addedRetryButton) return;

    const button = document.createElement('button');
    button.innerHTML = 'Try again';
    button.addEventListener('click', () => sendData());
    document.appendChild(button);

    addedRetryButton = true;
}

function showRetryableError(text: string) {
    message.innerHTML = text;
    showRetryButton();
}

function sendData() {
    const fragment = window.location.hash;

    const fields = new Map(
        fragment.slice(1).split('&').map((fieldEqualsValue) => {
            const [field, value] = fieldEqualsValue.split('=');
            return [field, decodeURIComponent(value)];
        })
    );

    const xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => window.close());
    xhr.addEventListener('abort', () => showRetryableError('Something went wrong.'));
    xhr.addEventListener('error', () => showRetryableError('Something went wrong.'));

    xhr.open('POST', 'http://localhost:8080/twitch-oauth-post');
    xhr.send(JSON.stringify({
        access_token: fields.get('access_token'),
        scope: fields.get('scope'),
    }));
}

sendData();