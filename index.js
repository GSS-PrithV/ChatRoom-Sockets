//Server file for the chat application

import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {}});
const roomCollection = [];

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//using handlebars, set the default view of the app at route /:id to index.html
app.engine('html', exphbs.engine());
app.set('view engine', 'html');

//GET and POST requests to LH3000/
app.get('/Rooms', (req,res) => {
    res.sendFile(path.resolve('views/rooms.html'));
});
app.post('/Rooms' , (req,res) => {
    res.sendFile(path.resolve('views/rooms.html'));
});

app.get('/Rooms/:id', (req,res) => {
    res.sendFile(path.resolve('views/index.html'));
});
app.post('/Rooms/:id' , (req,res) => {
    res.sendFile(path.resolve('views/index.html'));
});

//Socket connections 
io.on('connection', (socket) => { //when a user connects to the server
    console.log("User connected");

    socket.on('joinroom', (room) => { //when a user joins a room

        console.log("Joining room: " + room);

        if(!roomCollection.includes(room)){ //if the room isnt in the collection
            roomCollection.push(room);
        }

        socket.join(room);
        io.to(room).emit('userConnection', 'A user has joined the room'); //sends a message to all users that a user has connected
    });

    socket.on("leaveRoom", (room) => { //when a user leaves a room
        console.log("Leaving room:" + room)
        io.to(room).emit('userConnection', 'A user has left the room');//sends a message to all users that a user has left
        socket.leave(room); 
    });

    socket.on('disconnect', () => { //when a user disconnects from the server
        console.log("User disconnected");
    });

    socket.on('chat message', (room, msg) => { //when a user sends a message
        console.log(socket.rooms);
        io.to(room).emit('chat message', msg); //sends the message to all users
    });
});

server.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});