class Setting {
    #row
    #cell
    #dimesionBox
    #timeSpeed
    #permitThrowWall
    #numberEmtyBoxRestWin
    #areaGame

    #listElementRadioCheckThrowWall= $$("throw-wall")

    constructor(cell, row, dimesionBox, timeSpeed , permitThrowWall, areaGame,numberEmtyBoxRestWin ){
        this.#row=row;
        this.#cell=cell;
        this.#dimesionBox=dimesionBox;
        this.#timeSpeed=timeSpeed;
        this.#permitThrowWall=permitThrowWall;
        this.#areaGame=areaGame;
        this.#numberEmtyBoxRestWin=numberEmtyBoxRestWin;

        this.updateUi()
    }

    getRow(){
        return this.#row
    }
    getCell(){
        return this.#cell
    }
    getDimesionBox(){
        return this.#dimesionBox
    }
    getTimeSpeed(){
        return this.#timeSpeed
    }
    getPermitThrowWall(){
        return this.#permitThrowWall
    }
    getAreaGame(){
        return this.#areaGame
    }
    getNumberEmtyBoxRestWin(){
        return this.#numberEmtyBoxRestWin
    }

 
    
    setCell(cell){
        this.#cell
    }
    setRow(row){
        this.#row
    }
    setDimesionBox(dimesionBox){
       
        
        this.#dimesionBox
    }
    setTimeSpeed(timeSpeed){
        this.#timeSpeed
    }
    setPermitThrowWall(permitThrowWall){
        this.#permitThrowWall
    }
    setNumberEmtyBoxRestWin(numberEmtyBoxRestWin){
        this.#numberEmtyBoxRestWin
    }
}