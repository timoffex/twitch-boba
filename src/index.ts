function component(): Element {
    const elt = document.createElement('div');
    elt.innerHTML = 'Hello world, from TypeScript!';
    return elt;
}

document.body.appendChild(component());