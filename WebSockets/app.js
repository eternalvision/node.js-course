const express = require("express");
const http = require("http");
const WebSocket = require("ws");

const app = express();
const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

wss.on("connection", (ws) => {
    console.log("Клиент подключен");

    ws.on("message", (message) => {
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on("close", () => {
        console.log("Клиент отключился");
    });
});

// ws://localhost:3101

app.use(express.static("public"));

const PORT = process.env.PORT || 3101;

server.listen(PORT);
