let http = require('http');
let socketio = require('socket.io');
let express = require('express');
let app = express();

let server = http.createServer(app);
let sockets = socketio(server);

app.use(express.static('public'));


sockets.on('connection', socket => {
    console.log(socket.id, 'just connected');

    socket.on('pause-video', () => {
        sockets.emit('pause-video');
    });

    socket.on('play-video', command => {
        sockets.emit('play-video', command);
    });
});

server.listen(3000, () => {
    console.log('http://localhost:3000');
});