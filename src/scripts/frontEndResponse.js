// Purpose is to communicate with the backend.

// 1. Grab the button event
// 2. Have the state of the screen change
// 3. 

// Click on settings button
// The front end will deal with checking if the button was pressed.
// Maybe have a delay on how many times it can be pressed within a second or something.
// Once the signal is sent, the button cannot be pressed anymore

// This is for testing button functionality
const button = document.getElementById('InstallButton');
let buttonIsPressed = false;

console.log(button);

button.addEventListener("click", (buttonIsPressed) => {
    console.log('Button is pressed!');
    buttonIsPressed = true;
    console.log(buttonIsPressed);
    return buttonIsPressed;
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
