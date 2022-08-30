import { makeAutoObservable } from "mobx"

class CanvasState {
  canvas = null
  socket = null
  sessionId = null
  undoList = [] // стейт действий, которые делали
  redoList = [] // стейт действий, которые отменили
  username = ""

  constructor() {
    makeAutoObservable(this)
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(id) {
    this.sessionId = id
  }

  setUsername(username) {
    this.username = username
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  undo() {
    let context = this.canvas.getContext("2d")
    let dataURL;
    if (!!this.undoList.length) {
      dataURL = this.undoList.pop()
      this.pushToRedo(this.canvas.toDataURL())
      let img = new Image()

      img.src = dataURL

      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    } else {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    return dataURL
    
  }

  // static undoStatic() {
  //   let context = this.canvas.getContext("2d")

  //   if (!!this.undoList.length) {
  //     let dataUrl = this.undoList.pop()
  //     this.pushToRedo(this.canvas.toDataURL())
  //     let img = new Image()

  //     img.src = dataUrl

  //     img.onload = () => {
  //       context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  //       context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
  //     }
  //   } else {
  //     context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  //   }
  // }

  redo() {
    let context = this.canvas.getContext("2d")
    let dataURL;

    if (!!this.redoList.length) {
      dataURL = this.redoList.pop()
      this.pushToUndo(this.canvas.toDataURL())
      let img = new Image()

      img.src = dataURL

      img.onload = () => {
        context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
    } else {
      context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    return dataURL
  }

  updateCanvas(imageSrc) {
    const img = new Image()
    img.src = imageSrc

    img.onload = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
    }
  }
}

export default new CanvasState()
