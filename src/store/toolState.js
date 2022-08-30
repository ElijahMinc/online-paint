import {makeAutoObservable} from 'mobx'

class ToolState {
   tool = null

   defaultColor = '#00000'
   lineWidth = 1

   constructor(){
      makeAutoObservable(this)
   }

   setTool(tool){
      this.tool = tool
   }

   
   setFillColor(color){

      this.tool.fillColor = color
   }

   
   setStrokeColor(color){
      this.tool.strokeColor = color
   }

   setLineWidth(width){
      this.lineWidth = width
      this.tool.lineWidth = width
   }

   setDefaultColor(color){
      this.defaultColor = color
   }
}


export default new ToolState()