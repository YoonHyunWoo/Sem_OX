const app = require("express")();
const http = require("http");
const server = app.listen(3000);
const cors = require("cors");
const io = require("socket.io")(server);
app.use(cors());

let rooms = {};
let gamestatus = {};
let gm = {};
io.on("connection", (socket) => {
  socket.on("room", (data) => {
    socket.join(data);
    socket.room = data;
  });

  socket.on("name", (data) => {
    socket.name = data;

    io.to(socket.room).emit("message", socket.name + " is joinned");
    if (rooms[socket.room] == undefined) {
      rooms[socket.room] = socket.name + ", ";
      gm[socket.room] = socket.name
    } else {
      rooms[socket.room] += socket.name + ", ";
    }
    io.to(socket.room).emit("userCount", rooms[socket.room]);
    if (gamestatus[socket.room] == "starting") {
      socket.emit("start");
    }
  });

  // let arr = [1, 2, 3, 4, 5]
  // 옵셔널 체이닝 도입하기
  // console.log(arr?.[5])

  socket.on("message", (data) => {
    socket.broadcast
      .to(socket.room)
      .emit("message", socket.name + " : " + data);
  });

  socket.on("start", () => {
    gamestatus[socket.room] = "starting";
    io.to(socket.room).emit("start");
    io.to(socket.room).emit("message", "Started Game");
  });

  socket.on("disconnecting", () => {
    io.to(socket.room).emit("message", socket.name + " is Disconnected");
    rooms[socket.room] = rooms[socket.room].replace(socket.name + ", ", "");
    io.to(socket.room).emit("userCount", rooms[socket.room]);
    socket.leave(socket.room);
  });
});
