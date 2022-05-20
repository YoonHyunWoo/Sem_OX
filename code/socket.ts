const app = require('express')()
const http = require('http')
const server = app.listen(3000)
const cors = require('cors')
const io = require('socket.io')(server);
app.use(cors())


let rooms = {}
io.on('connection', (socket) => {
    
    socket.on('room', (data)=>{
        socket.join(data)
        socket.room = data
        
        
})

    socket.on('name', (data)=>{
        socket.name = data
        io.to(socket.room).emit('message',socket.name + " 님이 접속하셨습니다")
        if(rooms[socket.room] == undefined){
            rooms[socket.room] = socket.name + ' '
        }else{
            rooms[socket.room] += socket.name + ' '
        }
        io.to(socket.room).emit('userCount',rooms[socket.room])
        
        
    })

    socket.on('message', (data)=>{
        socket.broadcast.to(socket.room).emit('message',socket.name + ' : ' + data)
    })

    socket.on('disconnecting',()=>{
        io.to(socket.room).emit('message',socket.name + " 님이 퇴장하셨습니다")
        rooms[socket.room] = rooms[socket.room].replace(socket.name + ' ', '')
        io.to(socket.room).emit('userCount',rooms[socket.room])
        socket.leave(socket.room)
    })
    
})

