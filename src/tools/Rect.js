import Tool from "./Tools";

export default class Rect extends Tool{
   constructor(canvas, socket, id){
      super(canvas, socket, id);
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
            type: 'rect',
            x: this.startX,
            y: this.startY,
            width: this.width,
            height: this.height,
            color: this.context.fillStyle,
            lineWidth: this.context.lineWidth,
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

      
      this.startX = e.pageX - e.target.offsetLeft; // запоминаем начальную координату
      this.startY = e.pageY - e.target.offsetTop;// запоминаем начальную координату

      this.saved = this.canvas.toDataURL() // каждый раз, когда мы начинаем рисовать новую фигуру
      // сохраняем изображение с канваса
   }

   mouseMoveHandler(e){
      if(!this.mouseDown) return

      let currentX = e.pageX - e.target.offsetLeft;
      let currentY = e.pageY - e.target.offsetTop;

       this.width = currentX - this.startX;
       this.height = currentY - this.startY;

      this.draw(this.startX, this.startY, this.width, this.height)

   }


   draw(x, y, weight, height){
      const img = new Image()
      img.src = this.saved
      img.onload = () => {
         this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
         this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)

         // 1) Canvas очистили 
         // 2) Затем нарисовали на нем то изображение, которое нарисовали в самом начале

         this.context.beginPath()// начали рисовать новую линиую у канваса


         this.context.rect(x, y, weight, height) //чтобы нарисовать линию
         this.context.fill(); // чтобы заполнить
         this.context.stroke(); // чтобы обвести
      }
   }

  static staticDraw(context, x, y, weight, height, color, lineWidth){
         context.lineWidth = lineWidth
         context.fillStyle = color
         context.beginPath()// начали рисовать новую линиую у канваса
         context.rect(x, y, weight, height) //чтобы нарисовать линию
         context.fill(); // чтобы заполнить
         context.stroke(); // чтобы обвести
      
   }
}