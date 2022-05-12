const app = require('express')();
const server = app.listen(3000);
const io = require('socket.io')(server);
const cors = require('cors')
app.use(cors())


io.sockets.addListener('connection', (socket)=>{
    socket.join(socket.handshake.query.room)
    socket.emit('title', socket.handshake.query.room + "에 접속해 있습니다!")
})


app.get('/health', (req,res)=>{
    res.send({"status":"ok"})
})

app.get('/admin', (req,res)=>{
    res.send({"admin":"YoonHyunWoo"})
})