const app = require('express')()
const server = app.listen(3000);
const io = require('socket.io')(server);
const cors = require('cors')

let corsOptions = {
    origin: 'https://semox.s3.ap-northeast-2.amazonaws.com/',
    credentials: true
}

app.use(cors(corsOptions))

io.sockets.addListener('connection', (socket) => {
    let room = socket.handshake.query.room
    socket.join(room)
    let CCU: number = (Object.keys(JSON.stringify(io.nsps['/'].adapter.rooms[room].sockets)).length - 1) / 28
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