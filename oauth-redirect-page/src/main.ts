const token = document.location.hash;

if (window.opener) {
    const params = new Map(token.slice(1).split('&').map((param) => {
        const [name, value] = param.split('=');
        return [name, value];
    }));

    const message = JSON.stringify({
        access_token: params.get('access_token'),
        scope: params.get('scope'),
    });

    console.log(`Found opener. Posting: ${message}`);
    window.opener.postMessage(message, '*');
} else {
    console.log('No opener found.');
}

window.close();