// File location handling?
const https = require('https');
const fs = require('fs');
const path = require('path');

function InstallTheme() {
   // let file = fs.createWriteStream("C:/Users/axemi/AppData/Roaming/BetterDiscord/themes/orbit.theme.css");
   let file = fs.createWriteStream(path.join(process.env.APPDATA, "/BetterDiscord/themes/orbit.theme.css"));
   https.get('https://raw.githubusercontent.com/Sakezone/orbit/master/theme%20file/orbit.theme.css', response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log("done");
        })
    }).on("error", err => {
        console.log(err.message);
    })
}

exports.InstallTheme = InstallTheme;
