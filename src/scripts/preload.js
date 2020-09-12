// TODO: Get preload to work.
// TODO: Grab the orbit CSS Theme raw data file
// Needs an asynchronous function and needs to wait for the file to be downloaded.
// Download (do not update) file inside of a new directory if not created already.

console.log('Preload file initiated!');

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
   'api',
   {
      send: (channel, data) => { ipcRenderer.send(channel, data); },
      on: (channel, listener) => { ipcRenderer.on(channel, listener); }
   }
);