const app = require('express')();
const server = app.listen(3000);
const io = require('socket.io')(server);
const cors = require('cors')
app.use(cors())

io.on('connection', (socket) => {
    io.sockets.addListener('connection', (socket)=>{
        socket.emit('GM', 'Room is create to ' + socket.handshake.query.myChannel);
    })
});

app.get('/health', (req,res)=>{
    res.send({"status":"ok"})
})

app.get('/admin', (req,res)=>{
    res.send({"admin":"YoonHyunWoo"})
})