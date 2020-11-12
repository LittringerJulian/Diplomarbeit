const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain, ipcRenderer } = require("electron");
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

const express = require("express")();
const server = require("http").createServer(express);
const port = 1411;
server.listen(port, "0.0.0.0", () => {
    console.log("server listening on %s", ip);
});
express.options("*", cors(corsOptions));
const WebSocket = require("ws");
const wsport = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: wsport, host: "0.0.0.0" });


wss.on("connection", function connection(ws, req) {
    console.log("new connection: " + req.socket.remoteAddress);
    mainWindow.webContents.send("sendDeviceAccess");
    ws.access=false;
    ws.kick=false;

    ws.on("pong", heartbeat);
    ws.on("message", function incoming(data) {
        console.log("new message: %s", data);

        //******************** */
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
              console.log(client.access);
  
              client.send(data);
            }
        }); //******************** */
    });
});

function noop() {}

function heartbeat() {
    console.log("heartbeat");
    this.isAlive = true;
}
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        console.log("in loop");
        if (ws.isAlive == false) return ws.terminate();

        ws.isAlive = false;
        ws.ping(noop);
    });
}, 10000);

wss.on("close", function close() {
    clearInterval(interval);
});

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        titleBarStyle: "hidden",
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
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

app.on("ready", createWindow);

app.on("window-all-closed", function() {
    if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
    if (mainWindow === null) createWindow();
});
ipcMain.on("requestLocalIp", (e, arg) => {
    e.reply("sendLocalIp", ip);
});

ipcMain.on("requestPermission", (e, arg) => {
    permission = arg;
    e.reply("sendPermission");
})
/*express.get("/", cors(corsOptions), (req, res) => {
  
  res.send("requested access")
});
*/
