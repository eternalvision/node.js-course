const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();

app.use(express.static("public"));
app.use(cors());

// CORS => 5500 => 3000 error

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://127.0.0.1:5500",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("New connection");

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg);
    });

    socket.on("disconnect", () => {
        console.log("User disconnect");
    });
});

server.listen(3101);
