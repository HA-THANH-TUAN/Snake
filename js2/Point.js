class Point {
    #x
    #y
    constructor(x, y){
        this.#x=x;
        this.#y=y;
    }
    getX(){
        return this.#x
    }
    getY(){
        return this.#y
    }
    setX(x){
        this.#x=x
    }
    setY(y){
        this.#y=y
    }
}



class Food extends Point {
    #type
    constructor (type){
        super();
        this.#type=type
    }

}

export {Point,Food}