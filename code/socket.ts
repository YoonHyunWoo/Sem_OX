const app = require('express')()
const http = require('http')
const server = app.listen(3000)
const cors = require('cors')
const io = require('socket.io')(server);
app.use(cors())
io.on('connection', (socket) => {

    socket.on('room', (data)=>{
        socket.join(data)
        socket.room = data
        io.to(socket.room).emit('user', socket.name)
    })
    socket.on('name', (data)=>{
        socket.name = data
    })

    socket.on('disconnecting',()=>{
        socket.leave(socket.room)
    })
})


app.get('/health', (req,res) => {
    res.send({
        "status": "ok"
    })
})