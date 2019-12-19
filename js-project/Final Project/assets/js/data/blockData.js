class blockData {

    constructor(material, state, yPos, xPos, spritePos){
        this.material = material;
        this.state = state;
        this.yPos = yPos;
        this.xPos = xPos;
        this.spritePos = spritePos;
        this.itemAmout = 0;
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

    getItemCount(){
        return this.itemAmout;
    }

    addAmtOfMaterial(){
        return this.itemAmout += 1;
    }

    removeAmtOfMaterial(amt){
        return this.itemAmout = this.itemAmout - amt;
    }

    removeMaterial(){
        this.itemAmout -= 1;
    }

}