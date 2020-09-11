// TODO: Get preload to work.
// TODO: Grab the orbit CSS Theme raw data file
// Needs an asynchronous function and needs to wait for the file to be downloaded.
// Download (do not update) file inside of a new directory if not created already.

console.log('Preload filed initiated!');

const { ipcRenderer } = require('electron')

// Synchronous message emmiter and handler
console.log(ipcRenderer.sendSync('synchronous-message', 'sync ping')) 

// Async message handler
ipcRenderer.on('asynchronous-reply', (event, arg) => {
   console.log(arg)
})

// Async message sender
ipcRenderer.send('asynchronous-message', 'async ping')
