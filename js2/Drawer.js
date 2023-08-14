

export default class Drawer {
    static Snake (){


    }

    static Grid (row, column , cell , context){
      const height=row*cell
      const width=column*cell
      for (let j = 1; j <column ; j++) {
        context.beginPath();
        context.moveTo(j*cell, 0);
        context.lineTo(j*cell,height);
        context.strokeStyle = "white"
        context.lineWidth=0.1;
        context.stroke();
      }
      for (let i = 1; i <row; i++) {
        
        context.beginPath();
        context.moveTo(0, i*cell);
        context.lineTo(width, i*cell);
        context.lineWidth=0.1;
        context.strokeStyle = "white"
        context.stroke();
      }
  }

  static Snake (row, column, cell , context, data){
    data.forEach((point, index) => {
      if(index===0){
        context.beginPath();
        context.fillStyle = "red"; 
        context.roundRect(point.getX(), point.getY(), cell, cell, [cell/4]);
        context.stroke();
        context.fill();
      }
      else{
        context.beginPath();
        context.fillStyle = "rgb(17 15 93 / 86%)"; 
        context.roundRect(point.getX(), point.getY(), cell, cell);
        context.fill();
        context.stroke();
      }
    });
  }
  static Food (cell,context, data){
    data.forEach((point, index) => {
      context.beginPath();
      context.fillStyle = "yellow"; 
      context.roundRect(point.getX(), point.getY(), cell, cell, [cell/4]);
      context.stroke();
      context.fill();
    })
  }
    
  
}
