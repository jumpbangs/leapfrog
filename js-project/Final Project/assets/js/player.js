class Player{
    constructor(x,y){
        this.color1     = "#404040";
        this.color2     = "#f0f0f0";
        this.jumping    = true;

        this.velocity_x = 0;
        this.velocity_y = 0;
        //Player
        this.height     = 100;
        this.width      = 50;

        this.x          = 20;
        this.y          = 20;
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