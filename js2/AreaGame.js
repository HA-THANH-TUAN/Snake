import Drawer from "./Drawer.js";
import { Point } from "./Point.js";

export default class AreaGame { 
    #canvas = document.createElement("canvas");
    #ctxCanvas
    #dimensionBox
    // #dataCreateSnake

    #dataCreateSnake 
    #pointHeadSnake
    #vectorDrectionInitialSnake // R , L , U, D
    #directionPresentSnake="" // R , L , U, D

    #dataCellEmty=[]
    #dataFood=[]
    
    #numberEmtyBoxRestWin
    #permitThrowWall
    #timeSpeed
    #idInterval
    #enableClick=true

    #isPause=false
    #isPressContinue=false
    #is

    #row
    #column
    #width
    #height
    #listAvailabeDirection=[]   // only include that values  : "R" - "L" - "U" - "D" => string[]
    // #

    constructor(row, column , dimensionBox ,permitThrowWall, timeSpeed, numberEmtyBoxRestWin){

        this.#dimensionBox=dimensionBox
        this.#timeSpeed=timeSpeed
        this.#permitThrowWall=permitThrowWall
        this.#numberEmtyBoxRestWin=numberEmtyBoxRestWin
        this.#row=row
        this.#column=column
        this.#width=column*dimensionBox
        this.#height=row*dimensionBox

        this.#ctxCanvas=this.#canvas.getContext("2d");
        this.#canvas.height = row*this.#dimensionBox;
        this.#canvas.width = column*this.#dimensionBox;
        // Check in tag div#main exist children => remove it => add a new children
        const areaDisplayGame= document.getElementById("main")
        if(areaDisplayGame.children.length>0){
            areaDisplayGame.removeChild(areaDisplayGame.firstElementChild)
            areaDisplayGame.insertBefore( this.#canvas,areaDisplayGame.children[0])
        }else{
            areaDisplayGame.insertBefore( this.#canvas,areaDisplayGame.children[0])
        } 
    }

    createAreaGame(){
        this.createDataInitialSnake()
        this.updateAreaGame()

      

    }
    
    updateAreaGame(){
        this.#ctxCanvas.reset()
        
        Drawer.Grid(this.#row, this.#column , this.#dimensionBox, this.#ctxCanvas)
        
        Drawer.Snake(this.#row, this.#column , this.#dimensionBox, this.#ctxCanvas , this.#dataCreateSnake)

        this.createFood()
    }

    runAreaGame(){
        if(this.#directionPresentSnake !=="" & (!this.#isPause)){
            const handleSetInterval = ()=>{
                this.updateSnake()
                this.updateAreaGame()
                this.#enableClick=true
                this.checkWin()
            }
            handleSetInterval()
            this.#idInterval=  setInterval(handleSetInterval , this.#timeSpeed)
        }
    }

    createFood(){
        if(this.#dataFood.length===0){
            this.fillterCellEmty()
            const indexRandom = (-(this.#dataCellEmty.length-1)*Math.random()+(this.#dataCellEmty.length-1)).toFixed()
            const randomPointEmty = this.#dataCellEmty[indexRandom]
            this.#dataFood.push(randomPointEmty)
            Drawer.Food(this.#dimensionBox, this.#ctxCanvas , this.#dataFood )
        }
        else{
            Drawer.Food(this.#dimensionBox, this.#ctxCanvas , this.#dataFood )
        }
    } 
    
    getOppositeDrt(drt){
        if(drt=="R"){return "L"}
        else if(drt=="L"){return "R"}
        else if(drt=="U"){return "D"}
        else if(drt=="D"){return "U"}
    }

    checkDirectioAvailable(){
        const drt =["R", "L", "D","U"]
        let result=[]
        const headSnake = this.#dataCreateSnake[0]
        const oppositeDrt=this.getOppositeDrt(this.#vectorDrectionInitialSnake ) 
        if(this.#permitThrowWall){
            result=drt.filter((drt)=>(drt !==oppositeDrt))
        }
        else{
            const listDrtNotTouchWall = drt.filter((drtItem)=>{
                const checkDrt= this.checkIsTouchWall(headSnake.getX(), headSnake.getY(), drtItem)
                return (drtItem !== checkDrt) && (drtItem !== oppositeDrt)
            } )
            result=listDrtNotTouchWall
        }  

        return result
    }



    createDataInitialSnake(){
        const arrInitialPieces=[]
        const directCreateSnake= Math.random().toFixed() // = 0 : initial snake horizontal; = 1 initial snake vertical

        const pointRadomX= (-(this.#column-1)*Math.random()+this.#column-1).toFixed()*this.#dimensionBox;
        const pointRadomY= (-(this.#row-1)*Math.random()+this.#row-1).toFixed()*this.#dimensionBox;
         
        console.log("pointRadomX",pointRadomX)
        console.log("pointRadomY",pointRadomY)

        if(directCreateSnake==0){
            const isCreateSnakeToRight= (pointRadomX + 3*this.#dimensionBox < this.#width )
            for (let i=0 ; i<3 ; i++) {
                if(isCreateSnakeToRight){
                    arrInitialPieces.unshift(new Point(pointRadomX+i*this.#dimensionBox, pointRadomY))
                    this.#vectorDrectionInitialSnake="R"
                }
                else{
                    arrInitialPieces.unshift(new Point(pointRadomX-i*this.#dimensionBox, pointRadomY))
                    this.#vectorDrectionInitialSnake="L"
                }
            }
        }
        else{
            const isCreateSnakeToTop= (pointRadomY + 3*this.#dimensionBox < this.#height )
            for (let i=0 ; i<3 ; i++) {
                if(isCreateSnakeToTop){
                    arrInitialPieces.unshift(new Point(pointRadomX, pointRadomY+i*this.#dimensionBox))
                    this.#vectorDrectionInitialSnake="D"
                }
                else{
                    arrInitialPieces.unshift(new Point(pointRadomX, pointRadomY-i*this.#dimensionBox))
                    this.#vectorDrectionInitialSnake="U"
                } 
            }
        }

        console.log(arrInitialPieces ,this.#vectorDrectionInitialSnake)
        this.#dataCreateSnake=arrInitialPieces
        this.#listAvailabeDirection=this.checkDirectioAvailable()
    }

    fillterCellEmty(){
        const arrEmtyCell=[]
        for (let i = 0; i < this.#width; i=i+this.#dimensionBox) {
            for (let j = 0; j < this.#height; j=j+this.#dimensionBox) {
                const pointCheck = new Point(i , j)

                const isExistSnake = this.#dataCreateSnake.some((pointSnake)=>(pointCheck.getX()==pointSnake.getX())&&(pointCheck.getY()==pointSnake.getY()))
                if(!isExistSnake){
                    arrEmtyCell.push(pointCheck)
                }
            }
        }
        this.#dataCellEmty=arrEmtyCell
    }
    
    updateSnake(){
        const isIncludeListDirect = ["R", "L", "D","U", ""].includes(this.#directionPresentSnake)
        if((this.#directionPresentSnake !=="")&&isIncludeListDirect){
            const snakeNew = [...this.#dataCreateSnake]
            let head= snakeNew[0]
            let headY= head.getY()
            let headX= head.getX()
            const headTemporary = this.getHeadTemporary(headX, headY)
            const headYNew= headTemporary.getY()
            const headXNew= headTemporary.getX()
    
            const isTouchWall =this.checkIsTouchWall(headXNew,headYNew)
    
            const isTouchOwn = this.#dataCreateSnake.some((point)=>{
                return (point.getX()===headXNew && point.getY()==headYNew)
            })
    
            const isEating= this.#dataFood.some((food)=>{
                return ((food.getX()===headXNew )&& (food.getY()===headYNew))
            })
            const restEading= this.#dataFood.filter((food)=>{
                return (!(food.getX()===headXNew )&& (food.getY()===headYNew))
            })
    
            if(isTouchOwn){
                clearInterval(this.#idInterval)
                alert("thua")
    
            }
            else{
                if((isTouchWall !=="")&&(!this.#permitThrowWall)){
                        clearInterval(this.#idInterval)
                        alert("thua  admit throw wall")
                }
                else{
                    if(isEating){
                        snakeNew.unshift(new Point(headXNew, headYNew))
                        this.#dataFood=restEading
                        this.#dataCreateSnake=snakeNew
                    }
                    else{
                        snakeNew.pop()
                        snakeNew.unshift(new Point(headXNew, headYNew))
                        this.#dataCreateSnake=snakeNew
                    }
                }
            }
        }
    }
    checkWin (){
        const lgSnake= this.#dataCreateSnake.length
        const isWin = this.#column * this.#row <= lgSnake + this.#numberEmtyBoxRestWin 
        if(isWin){
            clearInterval(this.#idInterval)
            alert("win")
        }
    }


    getHeadTemporary(headX,headY ){
        const head= new Point(headX, headY)
        switch (this.#directionPresentSnake) {
            case "R":
                    if(this.#permitThrowWall){
                        if(headX >= this.#width-this.#dimensionBox){head.setX(0)}
                        else{head.setX(headX+this.#dimensionBox)}
                    }
                    else{head.setX(headX+this.#dimensionBox)}
                break;
                
                case "L":
                        if(this.#permitThrowWall){
                            if(headX <=0){{head.setX(this.#width-this.#dimensionBox)}}
                            else{head.setX(headX-this.#dimensionBox)}
                        }
                        else{head.setX(headX-this.#dimensionBox)}
                    break;

                case "U":
    
                        if(this.#permitThrowWall){
                            if(headY <= 0 ){head.setY(this.#height-this.#dimensionBox)}
                            else{head.setY(headY-this.#dimensionBox)}
                        }
                        else{head.setY(headY-this.#dimensionBox)}
                    break;

           
                case "D":
                    if(this.#permitThrowWall){
                        if(headY >=this.#height-this.#dimensionBox ){head.setY(0)}
                        else{head.setY(headY+this.#dimensionBox)}
                    }
                    else{head.setY(headY+this.#dimensionBox) }
                break;
            default:
                break;
        }
        return head
    }

    checkIsTouchWall(headX, headY ,drt=this.#directionPresentSnake){
        let isFail =""
    
            switch (drt) {
                case "R":
                            if(headX>=(this.#width)){isFail="R"}
                            break;
                case "L":
                            if(headX<0){ isFail="L"}
                            break;
                case "U":
                            if(headY<0){isFail="U"}
                            break;
                case "D":
                            if(headY>=(this.#height) ){isFail="D"}
                            break;
                default: isFail=""
                            break;
            }

        return isFail
    }

    getDirectionPresentSnake (){
        return this.#directionPresentSnake 
    }
    getListAvailabeDirection (){
        return this.#listAvailabeDirection 
    }

    setListAvailabeDirection (){
        this.#listAvailabeDirection = ["R", "L", "D","U"]
    }

    getIdInterval (){
        return this.#idInterval 
    }

    setDirectionPresentSnake (drt){
        this.#directionPresentSnake=drt
    }

    setEnableClick(dt){
        this.#enableClick=dt
    }

    getEnableClick(){
       return this.#enableClick
    }

    getIsPause(){
       return this.#isPause
    }

    setIsPause(bl){
        this.#isPause=bl
    }
    getIsPressContinue(){
       return this.#isPressContinue
    }

    setIsPressContinue(bl){
        this.#isPressContinue=bl
    }

    

}
