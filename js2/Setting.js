
const $=document.getElementById.bind(document)
const $$=document.getElementsByClassName.bind(document)

class Setting {
    #row
    #column
    #dimesionBox
    #timeSpeed
    #permitThrowWall
    #numberEmtyBoxRestWin
    #column_id
    #key_up
    #key_down
    #key_left
    #key_right

    widthScreen=window.screen.width;
    heightScreen=window.screen.height

    #listElementRadioCheckThrowWall= $$("throw-wall")
    #elementRestBoxWin= $("rest-box-win_id")
    #elementDimensionBox= $("dimension-box_id")
    #elementTimeSpeed= $("time-speed_id")
    #elementRow= $("row_id")
    #elementColumn= $("column_id")
    #elementKey_up =$('key_up')
    #elementKey_down =$('key_down')
    #elementKey_left =$('key_left')
    #elementKey_right =$('key_right')

    constructor(column=20, row=20, dimesionBox=25, timeSpeed=300 , permitThrowWall=true,numberEmtyBoxRestWin=3,key_up ="W",key_down="S", key_left="A",key_right="D"){
        this.#row=row;
        this.#column=column;
        this.#dimesionBox=dimesionBox;
        this.#timeSpeed=timeSpeed;
        this.#permitThrowWall=permitThrowWall;
        this.#numberEmtyBoxRestWin=numberEmtyBoxRestWin;
        this.#key_up=key_up
        this.#key_down=key_down
        this.#key_left=key_left
        this.#key_right=key_right
        
        this.updateUi()
    }
    
    getRow(){
        return this.#row
    }
    getColumn(){
        return this.#column
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
    getNumberEmtyBoxRestWin(){
        return this.#numberEmtyBoxRestWin
    }
    
    setColumn(col){
        this.#column=Number(col);
        this.updateUi();
    }
    setRow(row){
        this.#row=Number(row);
        this.updateUi();
    }
    setDimesionBox(dimesionBox){
        this.#dimesionBox=Number(dimesionBox);
        this.updateUi();
    }
    setTimeSpeed(timeSpeed){
        this.#timeSpeed=Number(timeSpeed);
        this.updateUi();
    }
    setPermitThrowWall(permitThrowWall){
        this.#permitThrowWall=Number(permitThrowWall);
        this.updateUi();
    }
    setNumberEmtyBoxRestWin(numberEmtyBoxRestWin){
        this.#numberEmtyBoxRestWin=Number(numberEmtyBoxRestWin);
        this.updateUi();
    }

   
    
    getKey_up(){
        return this.#key_up
    }

    getKey_down(){
        return this.#key_down
    }

    getKey_left(){
        return this.#key_left
    }

    getKey_right(){
        return this.#key_right
    }

    setKey_up(keyName){
        this.#key_up=keyName
        this.updateUi()
    }

    setKey_down(keyName){
        this.#key_down=keyName
        this.updateUi()
    }

    setKey_left(keyName){
        this.#key_left=keyName
        this.updateUi()
    }

    setKey_right(keyName){
        this.#key_right=keyName
        this.updateUi()
    }
    
    updateUi(){
        console.log("UI GOi LAO")
        Array.from(this.#listElementRadioCheckThrowWall, (radio)=>{
            const valueRadio = radio.value ==="1" ? true : false;
            console.log("check dieeu kien nef", this.#permitThrowWall === valueRadio    )
            if(this.#permitThrowWall === valueRadio){
                radio.checked=true;
                console.log(radio)
            }
            else {
                console.log(radio)
                radio.checked=false;
            }
        })
        
        Array.from(this.#listElementRadioCheckThrowWall, (radio)=>{
            radio.onchange=(e)=>{
                const dt=e.target.value
                
                if(Number(dt)===0){
                    
                    this.setPermitThrowWall(false);
                }
                else{
                    this.setPermitThrowWall(true);
                }
                console.log("ne ban:::",Number(e.target.value))
                console.log(this.#permitThrowWall)
                this.updateUi()
            }
        })
        
        this.#elementRestBoxWin.onchange=(e)=>{
            console.log("rest win")
            const data=e.target.value
            // this.#elementRestBoxWin.value=data
            this.setNumberEmtyBoxRestWin(data)
            
        }
        
        this.#elementTimeSpeed.onchange=(e)=>{
            console.log("speed")
            const data=e.target.value
            this.setTimeSpeed(data)
        }
        this.#elementDimensionBox.onchange=(e)=>{
            console.log("box")
            const data=e.target.value
            this.setDimesionBox(data)
        }
        this.#elementRow.onchange=(e)=>{
            console.log("Eee row")
            console.log("row")
            const data=e.target.value
            this.setRow(data)
        }
        this.#elementColumn.onchange=(e)=>{
            console.log("column")
            const data=e.target.value
            this.setColumn(data)
        }
        
        this.#elementKey_up.onkeyup=(e)=>{
            const km =e.key
            this.setKey_up(km)
        
        }
        
        this.#elementKey_down.onkeyup=(e)=>{
            const km =e.key
            this.setKey_down(km)
        
        }
        
        this.#elementKey_left.onkeyup=(e)=>{
            const km =e.key
            this.setKey_left(km)
        }
        
        this.#elementKey_right.onkeyup=(e)=>{
            const km =e.key
            this.setKey_right(km)
        }
        

        this.#elementRestBoxWin.value=this.#numberEmtyBoxRestWin;
        this.#elementTimeSpeed.value=this.#timeSpeed;
        this.#elementDimensionBox.value=this.#dimesionBox;
        this.#elementRow.value=this.#row;
        this.#elementColumn.value=this.#column;
        this.#elementKey_up.value = this.#key_up
        this.#elementKey_down.value = this.#key_down
        this.#elementKey_left.value = this.#key_left
        this.#elementKey_right.value = this.#key_right
    }
}

export default Setting