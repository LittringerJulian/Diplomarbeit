const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain,ipcRenderer } = require("electron");
const ip = require("node-local-ipv4")();
const cors = require("cors");

const allowedOrigins = [
  "capacitor://localhost",
  "ionic://localhost",
  "http://localhost",
  "http://localhost:8080",
  "http://localhost:8100",
];

let permission = false;

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};

const express = require('express')();
const server = require('http').createServer(express);
const port = 1411;
server.listen(port, "0.0.0.0");
express.options("*", cors(corsOptions));
/*express.get("/", cors(corsOptions), (req, res) => {
  console.log("request");
  res.send("es geht JAAAAAA");
});*/

const WebSocket = require("ws");
const wsport = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: wsport, host: "0.0.0.0" });


wss.on("connection", function connection(ws, req) {
  console.log("new connection: " + req.socket.remoteAddress);
  ws.on("message", function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.newvariable=true;
        console.log("variable="+client.newvariable);
        client.send(data);
      }
    });
  });
});
wss.on("close", function close() {});
/*express.get('/', (req, res) => {
  res.send("hallo")
});*/

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    titleBarStyle:"hidden",
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
});
ipcMain.on("requestLocalIp", (e, arg) => {
  e.reply("sendLocalIp", ip);
});

ipcMain.on("requestPermission", (e, arg) => {
  permission=arg;
    e.reply("sendPermission");
})


ipcMain.on("requestDeviceAccess", (e, arg) => {
  express.get("/",cors(corsOptions), (req, res)  =>{
    e.reply("sendDeviceAccess");
    res.send("requested access")
  });
})

