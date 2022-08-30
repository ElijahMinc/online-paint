import Tool from "./Tools";

export default class Line extends Tool{
   constructor(canvas, socket, sessionId){
      super(canvas, socket, sessionId);
      this.listen()
   }

   listen(){
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
      this.canvas.onmousedown = this.mouseDownHandler.bind(this)
      this.canvas.onmouseup =this.mouseUpHandler.bind(this)
   }

   mouseUpHandler(e){
      this.mouseDown = false

      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.id,
         figure: {
            type: 'line',
            currentX: this.currentX,
            currentY: this.currentY,
            x: e.pageX-e.target.offsetLeft,
            y: e.pageY-e.target.offsetTop,
            color: this.context.fillStyle,
            lineWidth: this.context.lineWidth
         }
      }))

      this.socket.send(JSON.stringify({
         method: 'draw',
         id: this.id,
         figure: {
            type: 'finish',
         }
      }))
   }

   mouseDownHandler(e){
      this.mouseDown = true
      this.currentX = e.pageX-e.target.offsetLeft
      this.currentY = e.pageY-e.target.offsetTop
      this.context.beginPath()
      this.context.moveTo(this.currentX, this.currentY)
      this.saved = this.canvas.toDataURL()
   }

   mouseMoveHandler(e){
      if(!this.mouseDown) return

      this.draw(e.pageX-e.target.offsetLeft, e.pageY-e.target.offsetTop);
   }


   draw(x, y){
      const img = new Image()
      img.src = this.saved
      img.onload = async () => {

          this.context.clearRect(0,0, this.canvas.width, this.canvas.height)
          this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
          this.context.beginPath()
          this.context.moveTo( this.currentX ,  this.currentY)
          this.context.lineTo(x, y)
          this.context.stroke()
      }
   }

   
   static staticDraw(context, currentX, currentY, x, y, color, lineWidth){
      context.lineWidth = lineWidth
      context.strokeStyle = color
      context.beginPath()
      context.moveTo(currentX, currentY)
      context.lineTo(x, y)
      context.stroke()
   }
}