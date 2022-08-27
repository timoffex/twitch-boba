import { app, BrowserWindow, ipcMain, shell } from 'electron';
import * as http from 'http';

// This allows TypeScript to pick up the magic constants that's auto-generated by Forge's Webpack
// plugin that tells the Electron app where to look for the Webpack-bundled app code (depending on
// whether you're running in development or production).
declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  // eslint-disable-line global-require
  app.quit();
}

const createWindow = (): void => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  ipcMain.on('do-twitch-auth', () => {
    const TWITCH_AUTHORIZE_URI =  'https://id.twitch.tv/oauth2/authorize';
    const OAUTH_CLIENT_ID =  'bz6gycujcnbnw2vvm615omfg7ptgjm';
    const OAUTH_REDIRECT_URI = 'http://localhost:8080/twitch-oauth'
    shell.openExternal(
      TWITCH_AUTHORIZE_URI
      + `?client_id=${OAUTH_CLIENT_ID}`
      + `&redirect_uri=${OAUTH_REDIRECT_URI}`
      + '&response_type=token'
      + `&scope=${encodeURIComponent('chat:read')}`);
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

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

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
const server = http.createServer((req, res) => {
  res
    .writeHead(200)
    .end('<html><body><p>Hello world!!!</p></body></html>');
});

server.listen(8080);