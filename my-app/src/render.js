const videoSelectBtn = document.getElementById('videoSelectBtn');
let videoElement = document.getElementById('video');
videoSelectBtn.onclick = getVideoSources;

// This is a module by electron from node.js
// We need remote to access inter-process communication
const { desktopCapturer, remote } = require('electron');
const { Menu } = remote;

// Get the available video sources
async function getVideoSources() {
  const inputSources = await desktopCapturer.getSources({
    types: ['window', 'screen']
  });

  const videoOptionsMenu = Menu.buildFromTemplate(
      // Array of objects
    inputSources.map(source => {
      return {
        label: source.name,
        click: () => selectSource(source)
      };
    })
  );
  

  videoOptionsMenu.popup();
}

let mediaRecorder; // MediaRecorder instance to capture footage
const recordedChunks = [];

// Change the videoSource window to record
async function selectSource(source) {

  videoSelectBtn.innerText = source.name;

  const constraints = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  };

  // Create a Stream
  const stream = await navigator.mediaDevices
    .getUserMedia(constraints);

  // Preview the source in a video element
  videoElement = stream;
  videoElement.play();

  // Create the Media Recorder
  const options = { mimeType: 'video/webm; codecs=vp9' };
  mediaRecorder = new MediaRecorder(stream, options);

  // Register Event Handlers
  mediaRecorder.ondataavailable = handleDataAvailable;
  mediaRecorder.onstop = handleStop;
}



