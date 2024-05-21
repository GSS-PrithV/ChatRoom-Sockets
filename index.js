//Server file for the chat application

import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import configRoutes from './routes/index.js';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {}});
const roomCollection = [];

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//using handlebars, set the default view of the app at route /:id to index.html
app.engine('html', exphbs.engine({defaultLayout: 'rooms'}));
app.set('view engine', 'handlebars');

configRoutes(app);


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

    socket.on('disconnecting', () => { //when a user disconnects from the server
        console.log("User disconnectinnnnn")
        console.log(socket.rooms)
        for (const roomName of socket.rooms) {
            console.log("Leaving room:" + roomName)
            io.to(roomName).emit('userConnection', 'A user has left');//sends a message to all users that a user has left
            socket.leave(roomName);
        }
    });

    socket.on('chat message', (room, msg) => { //when a user sends a message
        console.log(socket.rooms);
        io.to(room).emit('chat message', msg); //sends the message to all users
    });

    socket.on('lobby', () => { //when a user joins the lobby
        console.log("Joining lobby");
        socket.emit('RoomList', roomCollection); //sends the list of rooms to all users
    });

});

server.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});