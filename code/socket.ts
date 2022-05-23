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
        io.to(socket.room).emit('message',socket.name + " is joinned")
        if(rooms[socket.room] == undefined){
            rooms[socket.room] = socket.name + ', '
        }else{
            rooms[socket.room] += socket.name + ', '
        }
        io.to(socket.room).emit('userCount',rooms[socket.room])
        
        
    })

    socket.on('message', (data)=>{
        socket.broadcast.to(socket.room).emit('message',socket.name + ' : ' + data)
    })

    socket.on('start',()=>{
        socket.room
        io.to(socket.room).emit('start')
        io.to(socket.room).emit('message', "Started Game")
    })

    socket.on('disconnecting',()=>{
        io.to(socket.room).emit('message',socket.name + " is out")
        rooms[socket.room] = rooms[socket.room].replace(socket.name + ', ', '')
        io.to(socket.room).emit('userCount',rooms[socket.room])
        socket.leave(socket.room)
    })
    
})

