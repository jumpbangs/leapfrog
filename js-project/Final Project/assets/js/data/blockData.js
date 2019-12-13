class blockData {

    constructor(material, state, yPos, xPos, spritePos){
        this.material = material;
        this.state = state;
        this.yPos = yPos;
        this.xPos = xPos;
        this.spritePos = spritePos;
    }

    getMaterial(){
        return this.material;
    }

    getSpritePos(){
        return this.spritePos;
    }

    getState(){
        return this.state;
    }

    getXpos(){
        return this.xPos;
    }

    getYpos(){
        return this.yPos;
    }

}