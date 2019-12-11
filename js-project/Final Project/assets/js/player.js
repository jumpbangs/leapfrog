class Player {
    constructor(x, y, height, width) {
        this.color1 = "#404040";
        this.color2 = "#f0f0f0";
        this.jumping = true;

        this.velocity_x = 0;
        this.velocity_y = 0;
        //Player
        this.height = height;
        this.width = width;

        this.x = x;
        this.y = y;
    }

    jump() {
        if (!this.jumping) {
            this.jumping = true;
            this.velocity_y -= 20;
        }
    }

    moveLeft() {
        this.velocity_x -= 0.5;
    }

    moveRight() {
        this.velocity_x += 0.5;
    }

    update() {
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }


}