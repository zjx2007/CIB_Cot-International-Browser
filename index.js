/*
╭╮╭╮╭──╮╭──╮ ┐╭┌──╯    ┐  
│││││╭─╯│╭╮│ ├┴├──┐ └─┬┼┬┘
│││││╰─╮│╰╯│ ├┬┤  │ ╭ │││┐
│││││╭─╯│╭╭╯ ││├─╮│ │ ││││
╰╮╭╯│╰─╮││╰╮ │││╭─╯ │ │┼││
 ╰╯ ╰──╯╰╯╰╯  ┘┴╯┘└╯└─╯┘└╯
*/
const ver = 2;
/*
╭╮╭╮╭──╮╭──╮ ┐╭┌──╯    ┐  
│││││╭─╯│╭╮│ ├┴├──┐ └─┬┼┬┘
│││││╰─╮│╰╯│ ├┬┤  │ ╭ │││┐
│││││╭─╯│╭╭╯ ││├─╮│ │ ││││
╰╮╭╯│╰─╮││╰╮ │││╭─╯ │ │┼││    [END]
 ╰╯ ╰──╯╰╯╰╯  ┘┴╯┘└╯└─╯┘└╯
*/
const { app, BrowserWindow, Menu, Tray, ipcMain } = require('electron');
const {confg} = require('./conf.js')
const Store = require('electron-store');
const store = new Store();
const request = require('request');
let tray = null;
let mainWindow = null;
var options = {
    method: 'get',
    url: "http://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp"
};
var update = {
    method: 'get',
    url: "http://175.24.32.153:5858/upd.txt"
};
let currenttime = 0;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 400,
        minHeight: 300,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        },
        icon: "bin/icon.png",
        frame: false
    });
    mainWindow.loadFile('src/index.html');
    Menu.setApplicationMenu(null);
    // mainWindow.webContents.openDevTools({ mode: "detach" });
}

function buyIt() {
    mainWindow = new BrowserWindow({
        width: 360,
        height: 650,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        },
        resizable: false,
        icon: "bin/icon.png",
        frame: false
    });
    mainWindow.loadFile('src/buy.html');
    Menu.setApplicationMenu(null);
    // mainWindow.webContents.openDevTools({ mode: "detach" });
}

function cannot() {
    mainWindow = new BrowserWindow({
        width: 250,
        height: 70,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        },
        resizable: false,
        icon: "bin/icon.png",
        frame: false
    });
    mainWindow.loadFile('src/failed.html');
    Menu.setApplicationMenu(null);
}

function tupdate() {
    mainWindow = new BrowserWindow({
        width: 200,
        height: 70,
        webPreferences: {
            nodeIntegration: true,
            webviewTag: true,
            enableRemoteModule: true
        },
        resizable: false,
        icon: "bin/icon.png",
        frame: false
    });
    mainWindow.loadFile('src/update.html');
    Menu.setApplicationMenu(null);
    // mainWindow.webContents.openDevTools({ mode: "detach" });
}
app.whenReady().then(() => {
    request(update, function(err, res, body) {
        if(!confg.mustinternet){
            createWindow();
        }else{
            if (err) {
                cannot()
            } else {
                if (Number(body.split('\r\n')[0]) > ver) {
                    console.log("NOTE: Update required.");
                    tupdate();
                } else {
                    request(options, function(err, res, body) {
                        if (err) {
                            cannot()
                        } else {
                            currenttime = (Number(JSON.parse(body).data.t));
                            if (store.get('expdate') == undefined || store.get('expdate') < currenttime) {
                                buyIt();
                            } else {
                                createWindow();
                            }
                        }
                    })
                }
            }
        }
    })
})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

// Window control
ipcMain.on('window-min', function() {
    mainWindow.minimize();
})
ipcMain.on('window-max', function() {
    if (mainWindow.isMaximized()) {
        mainWindow.restore();
    } else {
        mainWindow.maximize();
    }
    mainWindow.webContents.send('maxmized', mainWindow.isMaximized());
})
ipcMain.on('window-get', function() {
    mainWindow.webContents.send('maxmized', mainWindow.isMaximized());
})
ipcMain.on('fullscr', function() {
    if (mainWindow.isFullScreen()) {
        mainWindow.setFullScreen(false);
    } else {
        mainWindow.setFullScreen(true);
    }
    mainWindow.webContents.send('fullscr', mainWindow.isFullScreen());
})
ipcMain.on('window-fullscr', function() {
    mainWindow.webContents.send('fullscr', mainWindow.isFullScreen());
})
ipcMain.on('exit', function() {
    app.exit();
})