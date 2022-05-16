const app = require('express')()
const server = app.listen(3000);
const cors = require('cors')
const io = require('socket.io')(server, {origin: "*"});
app.use((req,res,next)=>{
    next()
}, cors({maxAge: 84600}))
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

