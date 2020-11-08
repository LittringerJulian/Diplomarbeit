const url = require("url");
const path = require("path");
const {ipcMain} = require("electron");

const WebSocket = require('ws');
const port = process.env.PORT || 80;
const wss = new WebSocket.Server({port: 80, host: '0.0.0.0'});

wss.on('connection', function connection(ws, req) {
  console.log("new connection: " + req.socket.remoteAddress);
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
wss.on('close', function close() {

});
/*express.get('/', (req, res) => {
  res.send("hallo")
});*/