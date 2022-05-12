const app = require('express')();
const server = app.listen(3000);
const io = require('socket.io')(server);
const cors = require('cors')
app.use(cors())


io.sockets.addListener('connection', (socket) => {
    room = socket.handshake.query.room
    socket.join(room)
    CCU = (Object.keys(JSON.stringify(io.nsps['/'].adapter.rooms[room].sockets)).length - 1) / 28
    socket.emit('CCU', CCU)
    setInterval(() => {
        CCU = (Object.keys(JSON.stringify(io.nsps['/'].adapter.rooms[room].sockets)).length - 1) / 28
        socket.emit('CCU', CCU)
    }, 5000);
})

app.get('/health', (req, res) => {
    res.send({
        "status": "ok"
    })
})

app.get('/admin', (req, res) => {
    res.send({
        "admin": "YoonHyunWoo"
    })
})