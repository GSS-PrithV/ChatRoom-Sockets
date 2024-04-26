//Server file for the chat application

import express from 'express';
import {createServer} from 'http';
import { Server } from 'socket.io';
import exphbs from 'express-handlebars';
import path from 'path';

const app = express();
const server = createServer(app);
const io = new Server(server, {connectionStateRecovery: {}});

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//using handlebars, set the default view of the app at route /:id to index.html
app.engine('html', exphbs.engine());
app.set('view engine', 'html');

//GET and POST requests to LH3000/
app.get('/:id', (req,res) => {
    res.sendFile(path.resolve('views/index.html'));
});
app.post('/:id' , (req,res) => {
    res.sendFile(path.resolve('views/index.html'));
});

//Socket connections 
io.on('connection', (socket) => { //when a user connects to the server

    socket.on('joinroom', (room) => { //when a user joins a room
        socket.join(room);
    });

    io.emit('userConnection', 'A user has connected'); //sends a message to all users that a user has connected

    socket.on('disconnect', () => { //when a user disconnects from the server
        io.emit('userConnection', 'A user has disconnected');
    });
    
    socket.on('chat message', (msg) => { //when a user sends a message
        io.emit('chat message', msg); //sends the message to all users
    });
});

server.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});