class Mob {
    constructor(xPos, yPos,display) {
        this.x = xPos;
        this.y = yPos;
        this.state = 2;

        this.direction_x = -1;
        this.velocity_x = 0;
        this.velocity_y = 0;

        this.mobHp = Math.floor(Math.random() * 15);
        this.mobAttack = Math.floor(Math.random() * 5);
        this.buffer = display.buffer;

        this.buffer.fillStyle = 'limegreen';

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
        this.buffer.fillRect(this.x, this.y, 20, 20);
    }

    checkCollision(map){
        console.log(map);
    }


}
