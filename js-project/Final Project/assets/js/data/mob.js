class Mob {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.mobHp = Math.floor(Math.random() * 15);
        this.mobAttack = Math.floor(Math.random() * 5);
    }
}