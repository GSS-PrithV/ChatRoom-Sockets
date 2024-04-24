//Socket Connection
socket = io();
//

//Elements
chat = document.getElementById('chat-form');
input = document.getElementById('message');
messageList = document.getElementById('message-list');
//


if(chat){
    chat.addEventListener('submit', (e) => {
        e.preventDefault();
        if(input){
            console.log(input.value)
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });
}

socket.on('chat message', (msg) => {
    let item = document.createElement('li');
    item.innerHTML = msg;
    messageList.appendChild(item);
});