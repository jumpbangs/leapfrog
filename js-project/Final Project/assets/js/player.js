class Player {
    constructor(x, y, height, width) {
        this.jumping = true;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;
        //Player
        this.height = height;
        this.width = width;
        this.isPlayer = 1;
        this.x = x;
        this.y = y;

        this.health = 40;
        this.attack = 10;
        this.armour = 5;

        this.miningPower = 1;

    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 30;
        }
    }

    moveLeft() {
        this.velocity_x -= 0.5;
        this.direction_x = -1;
    }

    moveRight() {
        this.velocity_x += 0.5;
        this.direction_x = 1;
    }

    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    // Upgrade Pix
    levelUpPix(){
        this.miningPower = this.miningPower + 1;
    }

    getMiningLevel(){
        return this.miningPower;
    }


    //Upgrade Weapon
    getAttackPower(){
        return this.attack;
    }

    levelUpAttack(power){
        this.attack = this.attack + power;
    }

    getHealthPoint(){
        return this.health;
    }


    randNum(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}