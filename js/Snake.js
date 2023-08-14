

 // 0: create snake hori, 1:create snake ver
class Snake {
    #pieces
    #widthSnake
    #ctx
    constructor(pieces,widthSnake, context){
        this.#pieces=pieces
        this.#widthSnake=widthSnake
        this.#ctx=context

    }

    createSnake(){
        const ctx= this.#ctx;
        ctx.reset()
        this.#pieces.forEach((point,index) => {
            if(index===0){
                ctx.beginPath();
                ctx.strokeStyle="red"
                ctx.roundRect(point.x, point.y, this.#widthSnake, this.#widthSnake, [3]);
                ctx.stroke();
            }else{
                ctx.beginPath();
                ctx.fillStyle="black"
                ctx.fillRect(point.x, point.y, this.#widthSnake, this.#widthSnake);
                ctx.stroke();
            }
            
        });
    }
}
   
export default Snake;






// import { PieceSnake } from "./Point.js";

//  // 0: create snake hori, 1:create snake ver
// class Snake {
//     #direction= "right";
//     #impact=false;
//     #widthSnake
//     #matrix
//     #permitThrowWall
//     #pieces
//     #stateSnake = "stop"  // or stop
//     #idInterval= undefined
//     #timeSpeed
//     constructor(widthSnake,matrix,permitThrowWall, timeSpeed,context){
//         this.#widthSnake= widthSnake;
//         this.#matrix=matrix;
//         this.#permitThrowWall=permitThrowWall;
//         this.#pieces=this.createInitialPieceSnake(matrix,widthSnake)
//         this.#timeSpeed=timeSpeed;
//         this.ctx=context;
//     }
    
//     createInitialPieceSnake(matrix, dimensionBox){
//         const arrInitialPieces=[]
//         const directCreateSnake= Math.random().toFixed()
//         const pointF= (-(matrix-1)*Math.random()+matrix-1).toFixed()*dimensionBox;
//         if(directCreateSnake==0){
//             const isCreateSnakeToRight =(pointF+5*dimensionBox) <= ((matrix-1)*dimensionBox)
//                 for (let index = 3; index > 0; index--) {
//                     if(isCreateSnakeToRight){
//                         arrInitialPieces.push(new PieceSnake(pointF+index*dimensionBox,pointF))
//                     }
//                     else{
//                         arrInitialPieces.push(new PieceSnake(pointF-index*dimensionBox,pointF))
//                     }
//                 }
//         }
//         else{
//             const isCreateSnakeToRight =(pointF+5*dimensionBox) <= ((matrix-1)*dimensionBox)
//                 for (let index = 3; index > 0; index--) {
//                     console.log("zo lâp")
//                     if(isCreateSnakeToRight){
//                         arrInitialPieces.push(new PieceSnake(pointF,pointF+index*dimensionBox))
//                     }
//                     else{
//                         arrInitialPieces.push(new PieceSnake(pointF,pointF-index*dimensionBox))
//                     }
//                 }
//         }
//         return arrInitialPieces

//     }


//     createSnake(){
//         const ctx= this.ctx;
//         const lengthPieceSnake=this.#pieces.length   
//         ctx.reset()
//         ctx.beginPath();
//         this.#pieces.forEach((point,index) => {
//             if(index===0){
//                 ctx.fillStyle="red"
//                 ctx.fillRect(point.x, point.y, this.#widthSnake, this.#widthSnake);
//             }else{
//                 ctx.fillStyle="black"
//                 ctx.fillRect(point.x, point.y, this.#widthSnake, this.#widthSnake);
//             }
         
//         });
//     }

//     stopSnake(){
//         clearInterval(this.#idInterval)
//         this.#stateSnake="stop"
//     }

//     continuneSnake(){
//         this.runSnake()
//     }

//     runSnake(){
//         this.#stateSnake="run"
//         const handleRunSnake = (drt)=>{
//             const headSnakePresent= [...this.#pieces]

//             let xPre=headSnakePresent[0].x
//             let yPre=headSnakePresent[0].y
           
//             const end = (this.#matrix-1)*this.#widthSnake

//             const isTouchWallRight= xPre >= end
//             const isTouchWallLeft= xPre <= 0
//             const isTouchWallAbove= yPre <= 0
//             const isTouchWallUnder= yPre >= end
//             if(this.permitThrowWall){
//                 if(drt==="right"){
//                     xPre= isTouchWallRight ? 0 : xPre + this.#widthSnake
//                 }
//                 else if(drt==="left"){
//                     xPre= isTouchWallLeft ? end : xPre - this.#widthSnake
//                 }            
//                 else if(drt==="up"){
//                     yPre= isTouchWallAbove ? end : yPre - this.#widthSnake
//                 }
//                 else if(drt==="down"){
//                     yPre=isTouchWallUnder ? 0 : yPre + this.#widthSnake
//                 }            
//             }
            
//             headSnakePresent.pop()
//             headSnakePresent.unshift(new PieceSnake(xPre, yPre))
//             this.#pieces=headSnakePresent
//             // console.log("Tọa độ đầu mới:::", new PieceSnake(xPre, yPre))
    
//         }

//         this.#idInterval=setInterval(()=>{ 
//             const drt=this.#direction
//             handleRunSnake(drt)
//             this.createSnake()

//             console.log("setInterval:::",this.#idInterval)
//             // console.log("hướng:::",drt, this.#pieces[0])

//         },this.#timeSpeed)
//     }

//     set redirectSnake(direction){
//         this.#direction= direction
//         console.log("trong set :::", direction)
//     }

//     set updatePiecesSnake(arrPieces){
//         this.pieces=arrPieces;
//     }

//     get valueDirectSnake(){
//         return this.#direction
//     }

//     set impactValue(boolean){
//         this.#impact=boolean
//     }

//     get impactValue(){
//         return this.#impact
//     }

//     set permitThrowWall(boolean){
//         this.#permitThrowWall=boolean
//     }
    
//     get permitThrowWall(){
//         return this.#permitThrowWall
//     }
//     set permitThrowWall(boolean){
//         this.#permitThrowWall=boolean
//     }

//     get permitThrowWall(){
//         return this.#permitThrowWall
//     }

// }

// console.log("Snake")

// export default Snake;

