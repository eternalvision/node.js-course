import { WebSocketServer, WebSocket } from 'ws';
const wss = new WebSocketServer({ port: 8080 });
wss.on('connection', (socket) => {
  socket.isAlive = true;
  socket.on('pong', () => socket.isAlive = true);
  socket.on('message', (data) => {
    if (data.byteLength > 4096) return socket.close(1009, 'Message too large');
    for (const client of wss.clients) {
      if (client.readyState === WebSocket.OPEN) client.send(data);
    }
  });
});
setInterval(() => {
  for (const socket of wss.clients) {
    if (!socket.isAlive) socket.terminate();
    else { socket.isAlive = false; socket.ping(); }
  }
}, 30_000).unref();
