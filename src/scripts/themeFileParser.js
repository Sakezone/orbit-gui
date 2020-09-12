const https = require('https');
const fs = require('fs');
const path = require('path');

// Find version number.
// TODO: We don't want this to be spammable, set a gate or something.
function checkOrbitFileVersion() {
    /* Write Start */
    // Saving the orbit file from github into the cache folder
    let file = fs.createWriteStream(path.join(process.env.APPDATA, "/orbit/cache/orbit.theme.css"), 'utf8');
    https.get('https://raw.githubusercontent.com/Sakezone/orbit/master/theme%20file/orbit.theme.css', response => {
        response.pipe(file);

        file.on('finish', () => {
            file.close();
            console.log("temporary file written to cache folder.");

            /* Read Start */
            fs.readFile(path.join(process.env.APPDATA, "/orbit/cache/orbit.theme.css"),
                'utf8', function (err, githubData) {
                    if (err) {
                        return console.log(err);
                    }
                    let arrayOfGithubData = githubData.split(/("([^"]|"")*")/g);
                    // Hard coded.
                    console.log("Recent " + arrayOfGithubData[22]);

                    /* Start */
                    fs.readFile(path.join(process.env.APPDATA, "/BetterDiscord/themes/orbit.theme.css"),
                        'utf8', function (err, data) {
                            if (err) {
                                // TODO: Refer to install orbit theme function
                                return console.log(err);
                            }
                            let arrayOfData = data.split(/("([^"]|"")*")/g);
                            // Hard coded.
                            console.log("Local " + arrayOfData[22]);

                            /* COMPARING VERSION NUMBERS */
                            if (arrayOfGithubData[22] + arrayOfData[22]) {
                                console.log("Versions match :^) ");
                                // TODO: Throw a boolean back to let front end know we are good to go :^)
                            } else {
                                console.log("Versions don't match :^( ");
                                // TODO: Refer to install orbit theme function
                            }
                        }
                    )
                    /* End */
                }
            )
            /* End of Read */

        })
    }).on("error", err => {
        console.log(err.message);
    })
    /* Write End */




}

exports.checkOrbitFileVersion = checkOrbitFileVersion;
