const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");
const {ipcMain} = require("electron");
const ip = require('node-local-ipv4')();

/*
 //socket connection
const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io').listen(server);
 //socket handler
io.sockets.on('connection', (socket) => {
  console.log("connected");
  socket.emit('test event', 'data');
})
server.listen(80, '0.0.0.0', () => {
  console.log('server listening on ' + ip + ':' + 80);
})*/


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

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    resizable: true,
    autoHideMenuBar: true,
    frame: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `/dist/index.html`),
      protocol: "file:",
      slashes: true,
    })
  );
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
  mainWindow.on("closed", function () {
    mainWindow = null;
  });
}

app.on("ready", createWindow);

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function () {
  if (mainWindow === null) createWindow();
  ;

})
ipcMain.on("requestLocalIp", (e, arg) => {
  e.reply("sendLocalIp", ip);
});

