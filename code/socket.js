var app = require('express')();
var http = require('http');
var server = app.listen(3000);
var cors = require('cors');
var io = require('socket.io')(server);
app.use(cors());
io.on('connection', function (socket) {
    socket.on('room', function (data) {
        console.log(data);
        socket.join(data);
        var clients = io.sockets.clients();
        console.log(clients);
    });
});
app.get('/health', function (req, res) {
    res.send({
        "status": "ok"
    });
});
