const app = require('express')();
const server = app.listen(3000);
const io = require('socket.io')(server);
const cors = require('cors')
app.use(cors())


io.sockets.addListener('connection', (socket)=>{
    socket.join(socket.handshake.query.room)
    room = socket.handshake.query.room
    namespace = "/"
    var clients = io.nsps[namespace].adapter.rooms[room];
    Object.keys(clients).length;
    socket.emit('title', Object.keys(clients).length)
})


app.get('/health', (req,res)=>{
    res.send({"status":"ok"})
})

app.get('/admin', (req,res)=>{
    res.send({"admin":"YoonHyunWoo"})
})