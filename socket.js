const app = require('express')();
const server = app.listen(3000);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    //console.log("Client connected!");
    socket.on('GM', (msg) => {
        console.log(msg);
    })
    socket.emit('GM', 'Room is Created');
});
