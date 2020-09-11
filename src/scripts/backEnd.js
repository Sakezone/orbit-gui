let fileDropLocation = document.getElementById("holder");

fileDropLocation.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();

    for (const f of e.dataTransfer.files) {
      console.log('File(s) you dragged here: ', f.path)
    }
  });
  fileDropLocation.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
  });