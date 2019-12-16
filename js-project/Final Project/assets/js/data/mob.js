class Mob {
    constructor(xPos, yPos, mobHp) {
        this.x = xPos;
        this.y = yPos;
        this.state = 3;
        this.jumping = true;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.mobHp = mobHp;
        this.mobAttack = Math.floor(Math.random() * 5);
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 20;
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

    getDamage(dmg){
        this.mobHp -= dmg;
    }
}






