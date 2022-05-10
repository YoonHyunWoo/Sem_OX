const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const port = 3000;

io.on('connection',(socket)=>{
    console.log("connection");
})

app.listen(port, ()=>{
    console.log("listening to" + port);
})
