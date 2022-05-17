const app = require('express')()
const http = require('http')
const server = app.listen(3000)
const cors = require('cors')
const io = require('socket.io')(server);
app.use(cors())

let CCU = 0;

io.on('connection', (socket)=>{
    CCU++;
    socket.emit('CCU', CCU)
})

io.on('disconnected', (socket)=>{
    CCU--;
    socket.emit('CCU', CCU)
})

app.get('/health', (req, res) => {
    res.send({
        "status": "ok"
    })
})

