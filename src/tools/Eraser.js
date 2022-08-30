import Brush from "./Brush";
import Tool from "./Tools";

export default class Eraser extends Brush{
   constructor(canvas){
      super(canvas);
      this.listen()
   }

   static draw(context, x, y, lineWidth){
      context.lineWidth = lineWidth
      context.strokeStyle = "white" //чтобы линия имела цвет (контекст обведет эту линию)
      context.lineTo(x, y) //чтобы нарисовать линию
      context.stroke(); //чтобы линия имела цвет (контекст обведет эту линию)
   }

   // static staticDraw(context, x, y){
   //    context.strokeStyle = "white" //чтобы линия имела цвет (контекст обведет эту линию)
   //    context.lineTo(x, y) //чтобы нарисовать линию
   //    context.stroke(); //чтобы линия имела цвет (контекст обведет эту линию)
   // }
}