import  {PieceSnake, Point}  from "./Point.js";
import Snake from "./Snake.js";

class AreaGame {
    canvas = document.createElement("canvas");
    #pointsInitialCreateSnake=[] // colections of points initial create snake at the first into game 
    #matrix 
    #dimensionBox
    #listBoxEmty
    #ctxCanvas
    #intervalId
    #directionSnake=""
    #directionAvailable=[]
    #existFood=false
    #pointFood
    #stateSnake="run"
    #permitDirect=true
    #permitThrowWall=false  
    #timeSpeed

    constructor(matrix,dimensionBox, timeSpeed, permitThrowWall){

        this.canvas.style.borderWidth="10px";
        
        
        this.#permitThrowWall=permitThrowWall
        this.#timeSpeed=timeSpeed
        this.#dimensionBox=dimensionBox
        this.#matrix=matrix

        this.#pointsInitialCreateSnake=this.createInitialPieceSnake()
        this.#listBoxEmty=this.filterBoxEmty()
        
        // Check in tag div#main exist children => remove it => add a new children
        const areaDisplayGame= document.getElementById("main")
        if(areaDisplayGame.children.length>0){
            areaDisplayGame.removeChild(areaDisplayGame.firstElementChild)
            areaDisplayGame.insertBefore( this.canvas,areaDisplayGame.children[0])
        }else{
            areaDisplayGame.insertBefore( this.canvas,areaDisplayGame.children[0])
        }
    }

    createAreaGame(){
        const snake = new Snake(this.#pointsInitialCreateSnake, this.#dimensionBox , this.#ctxCanvas)
        snake.createSnake()
        this.createFoodSnake()
    }

    createInitialPieceSnake(){
        const arrInitialPieces=[]
        const directCreateSnake= Math.random().toFixed()
        const pointF= (-(this.#matrix-1)*Math.random()+this.#matrix-1).toFixed()*this.#dimensionBox;
            
            if(directCreateSnake===0){
                if(pointF>0){
                    this.#directionAvailable.push("up")
                }
                if(pointF<19*this.#dimensionBox){
                    this.#directionAvailable.push("down")
                }
                const isCreateSnakeToRight =(pointF+4*this.#dimensionBox) <= ((this.#matrix-1)*this.#dimensionBox)
                isCreateSnakeToRight  ?  this.#directionAvailable.push("right") :this.#directionAvailable.push("left")
                for (let index = 3; index > 0; index--) {
                    if(isCreateSnakeToRight){
                        arrInitialPieces.push(new PieceSnake(pointF+index*this.#dimensionBox,pointF))
                    }
                    else{
                        arrInitialPieces.push(new PieceSnake(pointF-index*this.#dimensionBox,pointF))
                    }
                }
            }
            else{
                if(pointF>0){
                    this.#directionAvailable.push("left")
                }
                if(pointF<19*this.#dimensionBox){
                    this.#directionAvailable.push("right")
                }
                const isCreateSnakeToUp =(pointF+4*this.#dimensionBox) <= ((this.#matrix-1)*this.#dimensionBox)
                isCreateSnakeToUp ? this.#directionAvailable.push("down") :this.#directionAvailable.push("up")
                for (let index = 3; index > 0; index--) {
                if(isCreateSnakeToUp){
                        arrInitialPieces.push(new PieceSnake(pointF,pointF+index*this.#dimensionBox))
                    }
                    else{
                        arrInitialPieces.push(new PieceSnake(pointF,pointF-index*this.#dimensionBox))
                    }
                }
        }

        return arrInitialPieces
        
    }

    createFoodSnake(){
        let pointRandom
        const ctx= this.#ctxCanvas;
        if(this.#pointFood && this.#existFood===true){
            pointRandom=this.#pointFood 
        }
        else{
            this.#listBoxEmty=this.filterBoxEmty()
            const emtyLenght= this.#listBoxEmty.length
            const indexRandomArrEmty= (-emtyLenght*Math.random()+emtyLenght).toFixed()
            pointRandom=this.#listBoxEmty[indexRandomArrEmty]
            console.log(">>>>> pointRandom food:::",pointRandom)
            pointRandom=new Point(pointRandom.x,pointRandom.y);
            this.#pointFood=pointRandom
            this.#existFood=true            
        }
        ctx.fillStyle="green"
        ctx.fillRect(pointRandom.x, pointRandom.y, this.#dimensionBox, this.#dimensionBox);
    }

    updateLocationSnake(){

    }

    runSnake(){
        // check đã bấm đi chuyển chưa : this.#direction 
        const isStartPlay= ["up", "down", "left", "right"].includes(this.#directionSnake)
        if(isStartPlay){
            const handleRunSnake = (drt)=>{
                const pieceSnakePresent= [...this.#pointsInitialCreateSnake]

                let xPre=pieceSnakePresent[0].x
                let yPre=pieceSnakePresent[0].y
            
                const end = (this.#matrix-1)*this.#dimensionBox

                const isTouchWallRight= xPre >= end
                const isTouchWallLeft= xPre <= 0
                const isTouchWallAbove= yPre <= 0
                const isTouchWallUnder= yPre >= end
                    if(drt==="right"){
                        if(this.#permitThrowWall){xPre= isTouchWallRight ? 0 : xPre + this.#dimensionBox}
                        else{xPre= xPre + this.#dimensionBox}
                    }
                    else if(drt==="left"){
                        if(this.#permitThrowWall){xPre= isTouchWallLeft ? end : xPre - this.#dimensionBox}
                        else{xPre=xPre - this.#dimensionBox}
                    }            
                    else if(drt==="up"){
                        if(this.#permitThrowWall){yPre= isTouchWallAbove ? end : yPre - this.#dimensionBox}
                        else{yPre=yPre - this.#dimensionBox}
                        
                    }
                    else if(drt==="down"){
                        if(this.#permitThrowWall){yPre=isTouchWallUnder ? 0 : yPre + this.#dimensionBox}
                        else{yPre=yPre + this.#dimensionBox}
                    }
                const headSnake = new PieceSnake(xPre, yPre)
                const checkTouchFood = headSnake.x===this.#pointFood.x && headSnake.y===this.#pointFood.y
                if(checkTouchFood){
                    this.#existFood=false
                }
                else{
                    pieceSnakePresent.pop()
                }
                const checkTouch= this.#pointsInitialCreateSnake.some((point)=>(point.x==headSnake.x && point.y==headSnake.y)) 
                                    || (headSnake.x > end || headSnake.x<0) || (headSnake.y > end || headSnake.y<0)
                if(checkTouch){
                    alert("thua")
                    clearInterval(this.#intervalId)
                }
                else{
                    pieceSnakePresent.unshift(headSnake)
                    this.#pointsInitialCreateSnake=pieceSnakePresent
                }
            }

            const runningSnake =()=>{ 
                const drt=this.#directionSnake
                handleRunSnake(drt)
                this.createAreaGame()
                this.#permitDirect=true
            }
            this.#intervalId=setInterval(runningSnake,this.#timeSpeed)
            runningSnake()
        }
    }

    pauseGame(){
        if((this.#stateSnake!=="stop")&&(this.#directionSnake!=="")){
            clearInterval(this.#intervalId)
            this.#stateSnake="stop"
        }
    }
    
    continueGame(){
        if((this.#stateSnake!=="run")&&(this.#directionSnake!=="")){
            this.#stateSnake="run";
            this.runSnake()
        }
    }

    get valuePermitDirect(){
        return this.#permitDirect
    }

    set valuePermitDirect(bol){
        this.#permitDirect = bol
    }

    
    filterBoxEmty(){
        const arrBoxEmty=[]
        for (let x = 0; x < this.#matrix; x++) {
            for (let y = 0; y < this.#matrix; y++) {
                const exist= this.#pointsInitialCreateSnake.some(point=>-(point.x===x*this.#dimensionBox && point.y===y*this.#dimensionBox))
                if(!exist){
                    arrBoxEmty.push(new Point(x*this.#dimensionBox,y*this.#dimensionBox))
                }
            }
        }
        return arrBoxEmty
    }
    
    get valueIntervalId(){
        return this.#intervalId
    }

    get valueStateSnake(){
        return this.#stateSnake
    }

    get valueDirectionAvailable(){
        return this.#directionAvailable
    }

    get valueDirectionSnake(){
        return this.#directionSnake
    }

    set valueDirectionSnake(drt){
        if(["up", "down", "left", "right"].includes(drt)){
            this.#directionSnake=drt
        }
    }
}

export default AreaGame