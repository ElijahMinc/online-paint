import Tool from "./Tools"

export default class Brush extends Tool {
  constructor(canvas, socket, id, type) {
    super(canvas, socket, id)
    this.type = type
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.context.beginPath() // начали рисовать новую линиую у канваса

    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    )
  }

  mouseDownHandler(e) {
    this.mouseDown = true

    this.context.moveTo(
      e.pageX - e.target.offsetLeft,
      e.pageY - e.target.offsetTop
    )
    // из координаты мыши относительно страницы
    //мы отнимаем левый отступ от края страницы
  }

  mouseMoveHandler(e) {
    if (!this.mouseDown) return
    // this.draw(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: this.id,
        figure: {
          type: this.type,
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          color: this.context.strokeStyle,
          lineWidth: this.context.lineWidth,
        },
      })
    )
  }

  static draw(context, x, y, color, lineWidth) {
    context.lineWidth = lineWidth

    context.strokeStyle = color
    context.fillStyle = color

    context.lineTo(x, y) //чтобы нарисовать линию
    context.stroke() //чтобы линия имела цвет (контекст обведет эту линию)
  }
}
