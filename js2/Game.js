import AreaGame from "./AreaGame.js"
import Setting from "./Setting.js"
const $=document.getElementById.bind(document)
class Game {
    #setting
    #areaGame
    #buttonDirectToleft= $("directToleft")
    #buttonDirectToUp= $("directToUp")
    #buttonDirectToDown= $("directToDown")
    #buttonDirectToRight= $("directToRight")
    #buttonReStartGame= $("reStartGame_id")
    #buttonStopSnake= $("stopSnake_id")
    #buttonContinueSnake= $("continueSnake_id")
    #returnGame=$("returnGame_id")
    #initialGameScreen=$("initial-game")
    #screenGame=$("main-game")

      
    constructor (){
        this.#setting= new Setting()
    }

    runGame(){
        this.#areaGame =new AreaGame(
            this.#setting.getRow(),
            this.#setting.getColumn(),
            this.#setting.getDimesionBox(),
            this.#setting.getPermitThrowWall(),
            this.#setting.getTimeSpeed(),
            this.#setting.getNumberEmtyBoxRestWin(),
        )
        
        this.#areaGame.createAreaGame()
        this.#areaGame.runAreaGame()

        const handleClickDrt=( drtChange ,drtOpposite)=>{
            const drtPresent= this.#areaGame.getDirectionPresentSnake()
            console.log(drtPresent)
            console.log(this.#areaGame.getListAvailabeDirection())

            if(drtPresent===""){
                const listDrtA= this.#areaGame.getListAvailabeDirection()
                if(listDrtA.includes(drtChange)){
                        this.#areaGame.setDirectionPresentSnake(drtChange)
                        this.#areaGame.setListAvailabeDirection()
                        this.#areaGame.runAreaGame()
                    }
                    
                }else{
                    const isClick=this.#areaGame.getEnableClick()
                    if(isClick && (drtPresent !== drtOpposite)){
                    const isPressContinue= this.#areaGame.getIsPressContinue()
                    if(isPressContinue){
                        this.#areaGame.setIsPause(false)
                        this.#areaGame.setIsPressContinue(false)
                        this.#areaGame.setDirectionPresentSnake(drtChange)
                        this.#areaGame.runAreaGame()
                    }
                    else if ((drtPresent !== drtChange)){
                        this.#areaGame.setEnableClick(false)
                        this.#areaGame.setDirectionPresentSnake(drtChange)
                    }
                }
                
            }
        }
        this.#returnGame.onclick=(e)=>{
            this.#initialGameScreen.style.display="block";
            this.#screenGame.style.display="none";
            clearInterval(this.#areaGame.getIdInterval())
        } 

        this.#buttonReStartGame.onclick=()=>{
            this.restartGame()
            
        }

        this.#buttonStopSnake.onclick=()=>{
            this.pauseGame()
            
        }
        
        this.#buttonContinueSnake.onclick=()=>{
            this.continueGame()
        }
        
        this.#buttonDirectToleft.onclick=()=>{
            handleClickDrt("L", "R")
        }
        
        this.#buttonDirectToUp.onclick=()=>{
            handleClickDrt("U", "D")
        }
        
        this.#buttonDirectToDown.onclick=()=>{
            handleClickDrt("D", "U")
            
        }
        
        this.#buttonDirectToRight.onclick=()=>{
            handleClickDrt("R", "L")
        }
     
        window.document.body.onkeydown=(e)=>{
            console.log(e.key)
            switch (true) {
                case this.#setting.getKey_up()===e.key:{
                    handleClickDrt("U", "D")
                }
                    
                    break;
                case this.#setting.getKey_down()===e.key:{
                    handleClickDrt("D", "U")
                }
                    
                    break;
                case this.#setting.getKey_left()===e.key:{
                    handleClickDrt("L", "R")
                }
                    
                    break;
                case this.#setting.getKey_right()===e.key:{
                    handleClickDrt("R", "L")
                }
                    
                    break;
            
                default:
                    break;
            }

        }
        
    }

    restartGame(){
        console.log("restart")
        clearInterval(this.#areaGame.getIdInterval())
        this.runGame()
    }
    
    pauseGame(){
        const drtPresent= this.#areaGame.getDirectionPresentSnake()
        const isPause= this.#areaGame.getIsPause()
        if((drtPresent !=="") && (!isPause)){
            this.#areaGame.setIsPause(true)
            clearInterval(this.#areaGame.getIdInterval())
        } 
    }
    
    continueGame(){
        const drtPresent= this.#areaGame.getDirectionPresentSnake()
        const isPause= this.#areaGame.getIsPause()
        if((drtPresent !=="") && isPause){
            clearInterval(this.#areaGame.getIdInterval())
            this.#areaGame.setIsPressContinue(true)
            
        }
    }
    
    getSettingGame(){
        
        return this.#setting
    }

    getAreaGame(){
        return this.#areaGame
    }
}

export default Game