const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 3100 });

wss.on("connection", (ws) => {
    ws.on("message", (message) => {
        console.log(`Получено сообщение: ${message}`);
    });
    ws.send("Привет от сервера");
});
