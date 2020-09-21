const {app, BrowserWindow} = require("electron");
const url = require("url");
const path = require("path");
const {ipcMain} = require("electron");
const ip = require('node-local-ipv4')();


// socket connection
const express = require('express')();
const server = require('http').createServer(express);
const io = require('socket.io').listen(server, {
  handlePreflightRequest: (req, res) => {
    const headers = {
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
      "Access-Control-Allow-Origin": req.headers.origin, //or the specific origin you want to give access to,
      "Access-Control-Allow-Credentials": true
    };
    res.writeHead(200, headers);
    res.end();
  }
});

const port = 3000;

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

// socket handler
io.sockets.on('connection', (socket) => {
  console.log("connected");
  socket.emit('test event', 'data');
})

server.listen(port, ip, () => {
  console.log('server listening on ' + ip + ':' + port)
})
