const fs = require('fs');


// TESTING REASONS
// Find version number.
function checkOrbitFileVersion() {
    var pathName = 'F:/orbit.theme.css';

    fs.readFile(pathName, 'utf8', function (err,data) {
    if (err) {
        return console.log(err);
    }
    console.log(data);
    });
}

exports.checkOrbitFileVersion = checkOrbitFileVersion;


// Find locations for all variables.
