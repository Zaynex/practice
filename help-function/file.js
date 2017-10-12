const muteEvent = (event) => {
  event.stopPropagation()
  event.preventDefault()
}

const addDragFileListListenerToElement = (element, onFileList) => {
  element.addEventListener('dragenter', muteEvent)
  element.addEventListener('dragover', muteEvent)
  element.addEventListener('drop', (event) => {
    muteEvent(event)
    const { files } = event.dataTransfer
    files && files.length && onFileList(files) // FileList (Array-like, contains File)
  })
}

let  div = document.getElementById("drag")
addDragFileListListenerToElement(div, console.log)