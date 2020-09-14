const https = require('https');
const fs = require('fs');
const path = require('path');
const { type } = require('os');

const arrayOfSettings = ["--homeIcon", "--mainBackground", "--topValue", "--bottomValue",];
const arrayOfColors = ["--mainColor", "--secondColor", "--unreadColor",];
const arrayOfPortraitImages = ["--userPopout", "--settingsBackground", "--contextMenu", "--topPortraitValue", "--topPortraitValue"];
const arrayOfOrientedImages = ["--profileBackground", "--mentionPopup", "--contextMenu", "--topHorizontalValue", "--botHorizontalValue"];
const arrayOfEmojis = ["--emojiSize", "--emojiHoverSize", "--reactionSize"];
const arrayOfFonts = ["--fontSize", "--messageSpacing"];
const arrayOfAvatars = ["--avatarSize", "--profileAvatarSize", "--avatarRound"];
const arrayOfColumns = ["--columns", "--guildsize", "--aligndms", "--round"];
const arrayOfRows = ["--HSL-server-icon-size", "--HSL-server-spacing"];

// Creating dictionary object
let settings = new Map();

// Find version number.
// TODO: We don't want this to be spammable, set a gate or something.
function CheckOrbitFileVersion() {
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


//TODO: Loop through all of the orbit file and find every index value of what the user can change
//TODO: When the user updates the value, we should have a stream setup so that it is hearing the updates in real time.
function CreateSettingsDictionary() {
    // Using this function, there are no duplicate entries.
    function mapDataToSettings(dataArray, settingsArray) {
        // Between "--" and the last character, and the ":" and the ";"
        // match then split then map
        // O(n)^2 * x time complexity
        for (whatever in dataArray) {
            for (index in settingsArray) {
                if (dataArray[whatever].startsWith(settingsArray[index])) {
                    // Split the string into two parts
                    let splitString = dataArray[whatever].split(/(:)/g);
                    splitString[0] = splitString[0].trim();
                    splitString[2] = splitString[2].trim();
                    // Get rid of semicolon
                    splitString[2] = splitString[2].slice(0, -1);
                    // Store key and value to settings map.
                    settings.set(splitString[0], { value: splitString[2], index: dataArray[whatever].indexOf(splitString[2]) });
                }
            }
        }
    }
    /* Start */
    fs.readFile(path.join(process.env.APPDATA, "/BetterDiscord/themes/orbit.theme.css"),
        'utf8', function (err, data) {
            if (err) {
                // TODO: Refer to install orbit theme function
                return console.log(err);
            }
            let arrayOfData = data.split(/(--([^;]*);)/g);

            // TODO: Maybe just keep all the settings in one array so no * the amount of different arrays to check
            mapDataToSettings(arrayOfData, arrayOfSettings);
            mapDataToSettings(arrayOfData, arrayOfColors);
            mapDataToSettings(arrayOfData, arrayOfPortraitImages);
            mapDataToSettings(arrayOfData, arrayOfOrientedImages);
            mapDataToSettings(arrayOfData, arrayOfFonts);
            mapDataToSettings(arrayOfData, arrayOfAvatars);
            mapDataToSettings(arrayOfData, arrayOfColumns);
            mapDataToSettings(arrayOfData, arrayOfRows);
            mapDataToSettings(arrayOfData, arrayOfEmojis);
            console.log(settings);

        }
    )
    /* End */
}

exports.CreateSettingsDictionary = CreateSettingsDictionary;
exports.CheckOrbitFileVersion = CheckOrbitFileVersion;
