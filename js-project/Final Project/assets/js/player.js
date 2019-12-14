class Player {
    constructor(x, y, height, width) {
        this.jumping = true;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;
        //Player
        this.height = height;
        this.width = width;

        this.x = x;
        this.y = y;

        this.health = 40;
        this.attack = 10;
        this.armour = 5;

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

    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }




}