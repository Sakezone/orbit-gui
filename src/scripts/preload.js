const fs = require('fs');
const path = require('path');

console.log('Preload file initiated!');

const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld(
   'api',
   {
      send: (channel, data) => { ipcRenderer.send(channel, data); },
      on: (channel, listener) => { ipcRenderer.on(channel, listener); }
   }
);


function CheckThemeFolder() {
   try {
      if (fs.existsSync(path.join(process.env.APPDATA, "/BetterDiscord/themes"))) {
         console.log("BetterDiscord Themes Folder Found");
         return true
      } else {
         return false
      }
   } catch (err) {
      console.error("ERROR: ", err);
   }
}

CheckThemeFolder();

/*
check betterdiscord install:
- get folders that start with "app-"
- split string to get version number string
- convert number string into actual decimal to compare for highest value
- continue to betterdiscord path
*/ 