class Player {
    constructor(x, y, height, width) {
        this.jumping = true;
        this.getHurt = false;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;

        //Player
        this.height = height;
        this.width = width;

        this.x = x;
        this.y = y;

        this.maxHealth = 110;
        this.health = this.maxHealth;
        this.attack = 10;
        this.armour = 5;
        this.miningPower = 4;
        this.maxStamina = 100;
        this.playerStamina = this.maxStamina;

    }

    //Movement
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

    getAttack(){
        return Math.floor(Math.random() * this.attack) + 1
    }
    levelUpAttack(power){
        this.attack = this.attack + power;
    }

    //Player Hp
    getHealthPoint(){
        return this.health;
    }

    getDamage(dmg){
        this.getHurt = true;
        return this.health -= (dmg - this.armour);
    }

    healHealthPoints(points){
        this.health += points;
    }


    //Player Stamina
    getStamina(){
        return this.playerStamina;
    }

    decreaseStamina(){
        return this.playerStamina -= 1;
    }

    regenStamina(){
        this.playerStamina += 0.5;
    }

    healStamina(points){
        this.playerStamina += points;
    }

    randNum(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}