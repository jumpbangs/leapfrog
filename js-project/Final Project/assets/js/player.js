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

        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.attack = 10;
        this.armour = 5;
        this.miningPower = 1;
        this.maxStamina = 20;

        this.playerStamina = this.maxStamina;

        this.mobKillScore = 1;

        this.playerAlive = 1;

    }

    /**
     *  Player Jump
     */
    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 30;
        }
    }

    /**
     *  Player Move Left
     */
    moveLeft() {
        this.velocity_x -= 0.5;
        this.direction_x = -1;
    }

    /**
     *  Player Move Right
     */
    moveRight() {
        this.velocity_x += 0.5;
        this.direction_x = 1;
    }

    /**
     *  Update Player Position
     */
    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }

    /**
     *  Add Mon/Monster Kill
     */
    addMobKill(){
        this.mobKillScore += 1;
    }

    /**
     * @returns {number} - Returns the number of mob/monster killed
     */
    getKillScore(){
        return this.mobKillScore;
    }

    /**
     *  Upgrade Mining Level
     */
    levelUpPix(){
        this.miningPower = this.miningPower + 1;
    }

    /**
     * @returns {number} - Returns Mining Level
     */
    getMiningLevel(){
        return this.miningPower;
    }


    /**
     * @returns {number} - Return Attack power
     */
    getAttackPower(){
        return this.attack;
    }

    /**
     * @returns {number} - Return randomly generated Attack power
     */
    getAttack(){
        return Math.floor(Math.random() * this.attack) + 1
    }

    /**
     * @param power - Added to the current Attack power
     */
    levelUpAttack(power){
        this.attack = this.attack + power;
    }

    /**
     * @returns {number|*} - Returns Player's Health Points
     */
    getHealthPoint(){
        return this.health;
    }

    /**
     * @param dmg - Damaged received by the Player
     * @returns {number} - Updates and Returns the current player's current health points
     */
    getDamage(dmg){
        this.getHurt = true;
        return this.health -= (dmg - this.armour);
    }

    /**
     * @param points - Added it to player's current health points
     */
    healHealthPoints(points){
        this.health += points;
    }

    /**
     * @returns {number|*} - Returns Player's stamina points
     */
    getStamina(){
        return this.playerStamina;
    }

    /**
     *  Decreases Player's stamina points
     */
    decreaseStamina(){
        this.playerStamina -= 1;
    }

    /**
     * @param points - Adds to player's current stamina points
     */
    healStamina(points){
        this.playerStamina += points;
    }


    /**
     * @returns {number} - Returns player's current armour
     */
    getArmour(){
        return this.armour;
    }

    /**
     * @param power - Adds to the player's current armour
     */
    levelUpArmour(power){
        this.armour = this.armour + power;
    }

}