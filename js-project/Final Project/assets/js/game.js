class Game{
    constructor(object){
        this.world = {

            background_color:"rgba(40,48,56,0.25)",
            friction:0.9,
            gravity:3,
            height:72,
            width:128,

            player: new Player(),

            collideObject(object) {
                if (object.x < 0) { object.x = 0; object.velocity_x = 0; }
                else if (object.x + object.width > this.width) { object.x = this.width - object.width; object.velocity_x = 0; }
                if (object.y < 0) { object.y = 0; object.velocity_y = 0; }
                else if (object.y + object.height > this.height) { object.jumping = false; object.y = this.height - object.height; object.velocity_y = 0; }
            },

            update() {

                this.player.velocity_y += this.gravity;
                this.player.update();

                this.player.velocity_x *= this.friction;
                this.player.velocity_y *= this.friction;

                this.collideObject(this.player);

            }

        }

        this.update();
    }


    update = function() {

        this.world.update();

    };

}