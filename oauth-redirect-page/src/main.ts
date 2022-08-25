const token = document.location.hash;

const paragraph = document.createElement('p');
paragraph.innerHTML = `Received token: ${token}`;
document.body.appendChild(paragraph);