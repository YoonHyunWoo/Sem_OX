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
    })

    socket.on('name', (data)=>{
        socket.name = data
        io.to(socket.room).emit('message',socket.name + " 님이 접속하셨습니다")
    })

    socket.on('message', (data)=>{
        socket.broadcast.to(socket.room).emit('message',data)
    })

    socket.on('disconnecting',()=>{
        io.to(socket.room).emit('message',socket.name + " 님이 퇴장하셨습니다")
        io.to(socket.room).emit('deleted User', socket.name)
        socket.leave(socket.room)
    })
})