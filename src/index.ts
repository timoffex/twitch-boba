function component(): Element {
    const elt = document.createElement('div');
    elt.innerHTML = 'Hello world!';
    return elt;
}

document.body.appendChild(component());