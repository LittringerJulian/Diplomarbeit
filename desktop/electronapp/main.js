const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain, ipcRenderer } = require("electron");
const ip = require("node-local-ipv4")();
const cors = require("cors");
const { v4: uuidv4 } = require('uuid');
const { EventEmitter } = require('events')
const WebSocket = require("ws");

// robot and affiliated calculation modules
var robot = require("robotjs")
const Gyropointer = require("./gyropointer.js")
const AccelerometerMouse = require("./accelerometerMouse.js")
const ClipboardManager = require("./clipboardManager.js")
var gyroPointer = new Gyropointer()
var accelerometerMouse = new AccelerometerMouse()
var clipboardManager = new ClipboardManager()

const emitter = new EventEmitter();
emitter.setMaxListeners(15);


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
    //mainWindow.webContents.openDevTools();
    mainWindow.on("closed", function() {
        mainWindow = null;
    });
}

function handleSocketMessage(msg, ws) {
    //console.log(msg.type);
    switch (msg.type) {
        case 'newConnection':
            mainWindow.webContents.send("sendDeviceAccess", JSON.stringify({ ws: ws, data: msg.data }));
            break;
        case 'requestSchemePush':
            mainWindow.webContents.send('requestSchemePush', JSON.stringify({ ws: ws }));
            break;
        case 'gyro':
            gyroPointer.moveMouse(msg.data)
            break;
        case 'acceleration':
            accelerometerMouse.moveMouse(msg.data)
            break;
        case 'copyimage':
            clipboardManager.copyImage(msg.data)
            break;
        case 'copycolor':
            clipboardManager.copyColor(msg.data)
            break;
        case 'keypress':
            robot.keyTap(msg.data)
            break;
        case 'keytype':
            robot.typeStringDelayed(msg.data, 0)
            break;
        case 'moveMouse':
            robot.moveMouse(robot.getMousePos().x + msg.data.x, robot.getMousePos().y + msg.data.y)
            break;
        case 'clickMouse':
            robot.mouseClick(msg.data)
            break;
        case 'toggleMouse':
            robot.mouseToggle(msg.data)
            break;
        case 'scrollMouse':
            //console.log(msg.data);
            robot.scrollMouse(msg.data.x * 10, msg.data.y * 10)
            break;
        case 'shortcut':
            //console.log("shortcut: ");
            //console.log(msg.data[1]);

            for (let i = 2; i < msg.data.length; i++) {
                robot.keyToggle(msg.data[i].toLowerCase(), "down")
            }
            for (let i = 2; i < msg.data.length; i++) {
                robot.keyToggle(msg.data[i].toLowerCase(), "up")
            }
            break;
        case 'keydown':
            //console.log("keydown: ");
            //console.log(msg.data[1]);
            robot.keyToggle(msg.data[1].toLowerCase(), "down")
            break;
        case 'keyup':
            //console.log("keyup: ");
            //console.log(msg.data[1]);
            robot.keyToggle(msg.data[1].toLowerCase(), "up")
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
/*
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
const { windowsStore } = require("process");
const { filter } = require("rxjs-compat/operator/filter");
const { createEnumDeclaration } = require("typescript");
*/
const wsport = process.env.PORT || 80;
const wss = new WebSocket.Server({ port: wsport, host: "0.0.0.0" });

wss.on("connection", function connection(ws, req) {

    console.log("new connection: " + req.socket.remoteAddress);
    ws.id = uuidv4();
    ws.access = false;
    ws.kick = false;



    ws.on("pong", heartbeat);
    ws.on("message", function incoming(data) {

        handleSocketMessage(JSON.parse(data), ws)
    });
    ws.on('close', function hee() {
        mainWindow.webContents.send("removeDevice", JSON.stringify({ ws: ws }));
    });
});

ipcMain.on("WebSocketAccess", (e, ws2, bool) => {
    wss.clients.forEach(function each(ws) {
        if (ws.id == ws2.id) {

            if (bool) {
                ws.access = true;
                ws.send(JSON.stringify({ type: "allowConnection", data: true }))
            } else {
                ws.kick = true;
            }
        }
    })
});

wss.on('close', function close() {
    console.log('disconnected');
    clearInterval(interval);
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
ipcMain.on("removeAllConnections", (e) => {
    wss.clients.forEach(function each(ws) {

        ws.terminate();
    });
})

ipcMain.on("kickWs", (e, arg) => {
    wss.clients.forEach(function each(ws) {
        if (ws.id == arg) {
            ws.terminate()
        }

    });
})

ipcMain.on("pushSchemes", (e, ws, schemes) => {
    console.log(schemes);
    wss.clients.forEach(function each(client) {
        // TODO
        // nur an 1 client sendn
        // client !== wss && 
        if (client.id == ws.id && client.readyState === WebSocket.OPEN) {
            let data = { type: "schemeList", data: schemes }
            client.send(JSON.stringify(data))
        }
    })
})

/*express.get("/", cors(corsOptions), (req, res) => {
ipcMain.on("kickWs", (e,arg) => {
wss.clients.forEach(function each(ws) {
if(ws.id==arg){
ws.terminate()
}
 
});
})
 
/*express.get("/", cors(corsOptions), (req, res) => {
 
res.send("requested access")
});
*/

ipcMain.on("pressShortcut", (e, arg) => {
    //console.log(arg);
    setTimeout(function() { handleSocketMessage(arg) }, 2000)
})