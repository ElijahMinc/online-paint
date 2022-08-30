export default class Tool{
   constructor(canvas, socket, id){
      this.canvas = canvas
      this.context = canvas.getContext('2d') // контекст канваса позволяет
      this.socket = socket
      this.id = id
      //производить различные манипуляции на canvas (оставлять линии, рисовать фигуры)
      this.destroyEvents() //каждый раз при выборе нового инструмента
      // слушатели событий будут обнуляться
   }

   destroyEvents(){
      this.canvas.onmousemove = null
      this.canvas.onmousedown = null
      this.canvas.onmouseup = null
   }

   set fillColor(color){
      this.context.fillStyle = color
   }

   set strokeColor(color){
      this.context.strokeStyle = color
   }

   set lineWidth(width){
      this.context.lineWidth = width
   }
}