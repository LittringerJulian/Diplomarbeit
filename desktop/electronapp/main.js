const { app, BrowserWindow } = require("electron");
const url = require("url");
const path = require("path");
const { ipcMain } = require("electron");
const ip = require('node-local-ipv4')();


// socket connection
const express = require('express')();
const server = require('http').createServer(express);



const port = 1411;

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
})
ipcMain.on("requestLocalIp", (e, arg) => {
  e.reply("sendLocalIp", ip);
});

ipcMain.on("requestDeviceAccess", (e, arg) => {
  express.get("/", () =>{
    e.reply("sendDeviceAccess");
  });
})

server.listen(port, "0.0.0.0", () => {
  console.log('server listening on 0.0.0.0 :' + port)
})





