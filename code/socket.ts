const app = require('express')()
const http = require('http')
const server = app.listen(3000)
const cors = require('cors')
const io = require('socket.io')(server);
app.use(cors())



io.on('connection', (socket) => {
    socket.on('room', (data)=>{
        // 클라이언트를 룸에 조인시키기
        socket.join(data)
        socket.room = data
    })

    socket.on('name', (data)=>{
        // 클라이언트 이름 정하기, 접속하셨습니다 emit
        socket.name = data
        io.to(socket.room).emit('message',socket.name + " 님이 접속하셨습니다")
    })

    socket.on('message', (data)=>{
        // 사용자 메시지 전달
        socket.broadcast.to(socket.room).emit('message',data)
    })

    socket.on('disconnecting',()=>{
        // 연결 끊길 시, 방을 나가고 퇴장했습니다 알리기
        io.to(socket.room).emit('message',socket.name + " 님이 퇴장하셨습니다")
        socket.leave(socket.room)
    })
})