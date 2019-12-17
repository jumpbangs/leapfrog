class Mob {
    constructor(xPos, yPos) {
        this.x = xPos;
        this.y = yPos;
        this.state = 3;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;

        this.mobAttack = 0;
        this.mobHp = 0;
        this.mobImgPos;
        this.mobType;
    }


    getMobAttack() {
        return this.mobAttack;
    }

    getDamage(dmg) {
        this.mobHp -= dmg;
    }

    mobDetails(type) {
        switch (type) {

            //Mush
            case 1:
                this.mobHp = 40;
                this.mobAttack = 8;
                this.mobImgPos = 0;
                this.mobType = 1;
                return this;
            // Snake
            case 2:
                this.mobHp = 70;
                this.mobAttack = 10;
                this.mobImgPos = 35;
                this.mobType = 2;
                return this;

             //Turkey
            case 3:
                this.mobHp = 50;
                this.mobAttack = 15;
                this.mobImgPos = 70;
                this.mobType = 2;
                return this;
        }
    }
}






