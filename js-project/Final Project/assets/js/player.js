class Player{
    constructor(x,y){
        this.color      = "#ff0000";
        this.height     = 16;
        this.jumping    = true;
        this.velocity_x = 0;
        this.velocity_y = 0;
        this.width      = 16;
        this.x          = 100;
        this.y          = 50;
    }

    jump(){
        if (!this.jumping) {

            this.color = "#" + Math.floor(Math.random() * 16777216).toString(16);
            if (this.color.length !== 7) {

                this.color = this.color.slice(0, 1) + "0" + this.color.slice(1, 6);

            }

            this.jumping     = true;
            this.velocity_y -= 20;

        }
    }

    moveLeft(){
        this.velocity_x -= 0.5;
    }

    moveRight(){
        this.velocity_x += 0.5;
    }

    update(){
        this.x += this.velocity_x;
        this.y += this.velocity_y;
    }
}