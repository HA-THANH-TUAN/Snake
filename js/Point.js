class Point {
    constructor(x, y){
        this.x=x;
        this.y=y;
    }
}




class PieceSnake extends Point  {
    constructor(x,y){
        super(x,y)
    }

}
class Food extends Point {
    constructor(add){
        super();this.add=add
    }

}


export {PieceSnake,Point}