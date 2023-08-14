import AreaGame from "./AreaGame.js";
class Game {
    matrix=60;
    dimensionBox= 10;
    timeSpeed=300;
    permitThrowWall =true;
    areaGame
    isStart= true
    constructor(){
    }
    
    set setUpGame({matrix, dimensionBox,timeSpeed}){
        this.matrix=matrix;
        this.dimensionBox=dimensionBox;
        this.timeSpeed=timeSpeed;
    }
    
    playGame(){
        this.areaGame=new AreaGame(this.matrix, this.dimensionBox , 200 , true)
        this.areaGame.createAreaGame()
        this.areaGame.runSnake()
    }    
}

export default Game