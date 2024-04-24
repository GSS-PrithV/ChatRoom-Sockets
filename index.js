import express from 'express';
import {createServer} from 'http';
import { fileURLToPath } from 'url';
import { dirname,join } from 'path';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use('/public', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//GET and POST requests to LH3000/
app.get('/', (req,res) => {
    res.sendFile(join(__dirname, 'views/index.html'));
});
app.post('/' , (req,res) => {
    res.sendFile(join(__dirname, 'views/index.html'));
});

//Socket connections 
io.on('connection', (socket) => { //when a user connects to the server
    console.log('a user connected');

    socket.on('disconnect', () => { //when a user disconnects from the server
        console.log('user disconnected');
    });
    
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });
});



server.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});