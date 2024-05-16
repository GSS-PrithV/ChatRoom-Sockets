//Client Side Script

//Socket Connection
socket = io();
//

//Elements
roomName = document.getElementById('room-name');
chat = document.getElementById('chat-form');
input = document.getElementById('message');
messageList = document.getElementById('message-list');
leave = document.getElementById('leave-room');
joinRoom = document.getElementById('room-join');
roomname = document.getElementById('room-name');
roomlist = document.getElementById('room-list');
//

//Event Listeners
if(joinRoom){
    joinRoom.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log(roomname.value);
        let item = document.createElement('li');
        let a = document.createElement('a');
        a.href = `/Rooms/${roomname.value}`;
        a.innerHTML = roomname.value;
        item.appendChild(a);
        roomlist.appendChild(item);
    });
}

//Event listeners
if(chat){
    urlRoomName = window.location.pathname.split('/')[2];
    roomName.innerHTML = 'Room: ' + urlRoomName;
    socket.emit('joinroom', urlRoomName);
    chat.addEventListener('submit', (e) => {
        e.preventDefault();
        if(input){
            console.log(input.value)
            socket.emit('chat message', urlRoomName, input.value); //sends the message to the server
            input.value = '';
        }
    });

    leave.addEventListener('click', () => {
        socket.emit('leaveRoom', urlRoomName);
    });
    
}

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

socket.on('userDisconnect', () => { //when the server says a user has disconnect, recieve it here and append to the message list
    //console.log("User gone")
    socket.emit('leaveRoom', window.location.pathname.split('/')[2]);
});