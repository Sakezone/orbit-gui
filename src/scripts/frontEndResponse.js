// Purpose is to communicate with the backend.
// 1. Grab the button event
// 2. Have the state of the screen change
// 3. 

// Click on settings button
// The front end will deal with checking if the button was pressed.
// Maybe have a delay on how many times it can be pressed within a second or something.
// Once the signal is sent, the button cannot be pressed anymore

// This is for testing button functionality
const installButton = document.getElementById('InstallButton');

installButton.addEventListener("click", () => {
  window.api.send("install-theme");
});

const settingsButton = document.getElementById('SettingsButton');

settingsButton.addEventListener("click", () => {
  // Sends it to main.js
  window.api.send("open-settings");
});

// Response from the main.js
window.api.on("install-complete", () => {
  console.log("fake install complete");
});


let fileDropLocation = document.getElementById("holder");

fileDropLocation.addEventListener('drop', (userFile) => {
    userFile.preventDefault();
    userFile.stopPropagation();

    for (const f of userFile.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  fileDropLocation.addEventListener('dragover', (userFile) => {
    userFile.preventDefault();
    userFile.stopPropagation();
  });
  
