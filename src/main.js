const { error } = require('console');
const { app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const backend = require('./scripts/backEnd');
const themeFileParser = require('./scripts/themeFileParser');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    icon: path.join(__dirname,'/assets/orbitservericon.png'),
    webPreferences: {
      // Security risk as well as very, very slow.
      // Node integration is also a security risk
      nodeIntegration: false,
      // Prevent Prototype pollution.
      contextIsolation: true,
      enableRemoteModule: false,
      preload: path.join(__dirname, '/scripts/preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.on("open-settings", (event) => {
  // Calling the function from the themFilerParser.js
  themeFileParser.checkOrbitFileVersion();
  event.sender.send("settings-opened");
});

ipcMain.on("install-theme", (event) => {
  backend.InstallTheme();
  event.sender.send("install-complete");
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

// File Path for Orbit 
console.log(app.getPath('userData'));
// File Path for, example %APPDATA%/Roaming for Windows 
console.log(app.getPath('appData'));
