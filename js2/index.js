import Game from "./Game.js"
const $=document.getElementById.bind(document)
const $$=document.getElementsByClassName.bind(document)

class Index {
    constructor (){
        const game=new Game()
        const settingGame=game.getSettingGame()
        const areaGame=game.getAreaGame()  
        
        const widthScreen = window.screen.width
        const heightScreen = window.screen.height          
            
        const buttonCloseSetting=$("button-close-setting")
        const buttonSettingGame=$("setting-game")
        const wrapperSetting=$("wrapper-setting")
        const buttonOpenningGame=$("button-openning-game")
        const initialGameScreen=$("initial-game")
        const screenGame=$("main-game")
   
        
        // game.runGame()
        // initialGameScreen.style.display="none";
        // screenGame.style.display="block";


        



            
        buttonCloseSetting.onclick=(e)=>{
            wrapperSetting.style.display="none"
        }          

        

        buttonSettingGame.onclick=(e)=>{
            wrapperSetting.style.display="block"
            settingGame.updateUi()

        }          

        // buttonCommitSetup.onclick=(e)=>{
        //     wrapperSetting.style.display="none"
            
        // }          

        buttonOpenningGame.onclick=(e)=>{
            game.runGame()
            initialGameScreen.style.display="none";
            screenGame.style.display="block";
        }
    }
}

new Index()