// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld('electronApi', {
    doTwitchAuth: () => ipcRenderer.send('do-twitch-auth'),
    addViewer: (username: string) => ipcRenderer.send('add-viewer', username)
});