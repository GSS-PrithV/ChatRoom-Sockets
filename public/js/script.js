//Client Side Script

//Socket Connection
socket = io();
//

//Elements
roomName = document.getElementById('room-name');
chat = document.getElementById('chat-form');
input = document.getElementById('message');
messageList = document.getElementById('message-list');
//


if(chat){
    roomName.innerHTML = 'Room: ' + window.location.pathname.split('/')[1];
    chat.addEventListener('submit', (e) => {
        e.preventDefault();
        if(input){
            console.log(input.value)
            socket.emit('chat message', input.value); //sends the message to the server
            input.value = '';
        }
    });
}

socket.emit('joinroom',  console.log(window.location.pathname.split('/')[1])); //sends a message to all users that a user has connected

socket.on('userConnection', (msg) => { //when the server sends the message to all users, recieve it here and append to the message list
    let item = document.createElement('li');
    item.innerHTML = msg;
    messageList.appendChild(item);
});

socket.on('chat message', (msg) => { //when the server sends the message to all users, recieve it here and append to the message list
    let item = document.createElement('li');
    item.innerHTML = msg;
    messageList.appendChild(item);
});