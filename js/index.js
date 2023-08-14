
import Game from "./Game.js";

const widthScreen = window.screen.width
const heightScreen = window.screen.height

const setting = {
    
}

const $=document.getElementById.bind(document)


const runApp = ()=>{
    const game=new Game()
    game.playGame()

    const matrixInput = $("matrix_id")
    const dimesionBoxInput = $("dimensionBox_id")
    const timeSpeendInput = $("timeSpeed_id")
    const buttonSetUp = $("buttonSetup")
    const buttonRunGame= $("runGame_id")
    const buttonReStartGame= $("reStartGame_id")
    const buttonStopSnake= $("stopSnake_id")
    const buttonContinueSnake= $("continueSnake_id")

    const buttonDirectToleft= $("directToleft")
    const buttonDirectToUp= $("directToUp")
    const buttonDirectToDown= $("directToDown")
    const buttonDirectToRight= $("directToRight")

    const stateSetUp = {
        matrix: 150,
        dimensionBox:10,
        timeSpeed:500
    }

    const handleOnchangeSetUpGame=(e)=>{
        stateSetUp[e.target.name] = Number(e.target.value)
    }

    matrixInput.value=stateSetUp.matrix
    dimesionBoxInput.value=stateSetUp.dimensionBox
    timeSpeendInput.value=stateSetUp.timeSpeed

    dimesionBoxInput.onchange=handleOnchangeSetUpGame
    matrixInput.onchange=handleOnchangeSetUpGame
    timeSpeendInput.onchange=handleOnchangeSetUpGame

    // buttonSetUp.onclick=function handleOnSumbitFormSetUp(){
    //     game.setUpGame=stateSetUp
    // }

    buttonReStartGame.onclick=()=>{
        const isAgree= confirm("Bạn có muốn chơi lại không !")
        console.log("có restart không ::",isAgree)
        if(isAgree){
            clearInterval(game.areaGame?.valueIntervalId)
            game.playGame?.()
        }    
    }

    buttonStopSnake.onclick=()=>{
        game.areaGame.pauseGame?.()
    }
    buttonContinueSnake.onclick=()=>{
        game.areaGame.continueGame?.()
    }

    // Button direction: R-L-U-D

    const handleClickDirect=(drt, opstdrt)=>{
        const areaGame=game.areaGame
        if(areaGame){
            const drtAvailable=areaGame.valueDirectionAvailable
            const drtPrt=areaGame.valueDirectionSnake
            const isPermitDrt= areaGame.valuePermitDirect
            if(drtPrt===""){
                if(drtAvailable.includes(drt)){
                    areaGame.valueDirectionSnake=drt
                    areaGame.runSnake()
                }
                else{
                    alert("Bạn không rẻ được nha !")
                }
            }

            else{
                if(drtPrt!==opstdrt && drtPrt!==drt && isPermitDrt===true ){
                    areaGame.valuePermitDirect=false
                    areaGame.valueDirectionSnake=drt
                }
            }
        }
    }

    buttonDirectToleft.onclick=(e)=>{
        handleClickDirect("left", "right")
    }
    buttonDirectToUp.onclick=(e)=>{
        handleClickDirect("up", "down")
    }
    buttonDirectToDown.onclick=(e)=>{
        handleClickDirect("down", "up")
    }
    buttonDirectToRight.onclick=(e)=>{
        handleClickDirect("right", "left")
    }
    window.onkeypress
}

runApp()

const buttonCloseSetting=$("button-close-setting")
const buttonSettingGame=$("setting-game")
const buttonCommitSetup=$("button-commit-setup")
const wrapperSetting=$("wrapper-setting")
const buttonOpenningGame=$("button-openning-game")
const initialGameScreen=$("initial-game")
const screenGame=$("main-game")

buttonCloseSetting.onclick=(e)=>{
    console.log(wrapperSetting.style.display="none")
}

buttonSettingGame.onclick=(e)=>{
    console.log(wrapperSetting.style.display="block")
}

buttonCommitSetup.onclick=(e)=>{
    console.log(wrapperSetting.style.display="none")
    
}

buttonOpenningGame.onclick=(e)=>{
    initialGameScreen.style.display="none";
    screenGame.style.display="block";
    runApp()
}




