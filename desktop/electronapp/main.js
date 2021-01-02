const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain, ipcRenderer } = require("electron");
const ip = require("node-local-ipv4")();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');

let permission = false;

// robot and affiliated calculation modules
var robot = require("robotjs")

const Gyropointer = require("./gyropointer.js")
const AccelerometerMouse = require("./accelerometerMouse.js")
const ClipboardManager = require("./clipboardManager.js")
var gyroPointer = new Gyropointer()
var accelerometerMouse = new AccelerometerMouse()
var clipboardManager = new ClipboardManager()

function handleSocketMessage(msg) {
    switch (msg.type) {
        case 'gyro':
            gyroPointer.moveMouse(msg.data)
            break;
        case 'acceleration':
            accelerometerMouse.moveMouse(msg.data)
            break;
        case 'copyimage':
            clipboardManager.copyImage(msg.data)
            break;
        case 'keypress':
            robot.keyTap(msg.data)
            break;
        case 'keytype':
            robot.typeString(msg.data)
            break;
        case 'moveMouse':
            robot.moveMouse(robot.getMousePos().x + msg.data.x, robot.getMousePos().y + msg.data.y)
            break;
        case 'clickMouse':
            robot.mouseClick(msg.data)
            break;
    }
}

const allowedOrigins = [
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8100",
];

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
express.get("/", cors(corsOptions), (req, res) => {
    console.log("request");
    res.send("es geht JAAAAAA");
});
express.options("*", cors(corsOptions));
const WebSocket = require("ws");
const { windowsStore } = require("process");
const { filter } = require("rxjs-compat/operator/filter");
const { createEnumDeclaration } = require("typescript");
const wsport = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: wsport, host: "0.0.0.0" });

wss.on("connection", function connection(ws, req) {

    //clipboardManager.copyText("hallo test electon copy")

    console.log("new connection: " + req.socket.remoteAddress);
    ws.id = uuidv4();
    ws.access = false;
    ws.kick = false;

    mainWindow.webContents.send("sendDeviceAccess", ws);

    ws.on("pong", heartbeat);
    ws.on("message", function incoming(data) {

        handleSocketMessage(JSON.parse(data))
    });
});

ipcMain.on("WebSocketAccess", (e, ws2, bool) => {
    wss.clients.forEach(function each(ws) {

        if (ws.id == ws2.id) {
            //console.log("inner1");
            if (bool) {
                ws.access = true;
            } else {
                //console.log("inner2");

                ws.kick = true;

            }
        }
    })
});


function noop() {}

function heartbeat() {
    //console.log("heartbeat");
    this.isAlive = true;
}
const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
        //console.log("in loop");
        //console.log("in heartbeat:" + ws.kick)
        if (ws.isAlive == false || ws.kick == true) return ws.terminate();
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

        width: 1280,
        height: 720,
        minHeight: 720,
        minWidth: 1280,

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
    mainWindow.on('resize', function() {

        var size = mainWindow.getSize();
        mainWindow.setSize(size[0], parseInt(size[0] * 9 / 16));

    });
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