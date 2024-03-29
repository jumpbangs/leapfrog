let camView = {
    x: 0,
    y: 0,
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
};

class Display {

    /**
     *
     * @param canvas - Canvas ID
     */
    constructor(canvas) {
        this.buffer = document.createElement('canvas').getContext('2d');
        this.context = canvas.getContext('2d');

        this.tile_sheet = this.tileSheet(80, 6);
        this.image = new Image();
        this.chara_img = new Image();
    }

    /**
     *
     * @param x - X position of the Inventory
     * @param y - Y position of the Inventory
     * @param width - Width of the Inventory
     * @param height - Height of the Inventory
     * @param color - Color of the Inventory
     */
    drawInventory = (x, y, width, height, color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };


    /**
     *  Renders the Canvas to enable player view
     */
    render() {
        this.context.save();
        this.context.translate(-camView.x, camView.y);
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.restore();
    };

    /**
     *
     * @param width - Width given to the Canvas
     * @param height - Height given to the Canvas
     */
    loadCanvas(width, height) {
        this.context.canvas.width = width;
        this.context.canvas.height = height;
    }

    /**
     *
     * @param width
     * @param height
     * @param height_width_ratio
     */


    /**
     *
     * @param map - Map Array to draw out the Map
     */
    drawMap(map) {
        let tileSize = 30;
        for (let index = map.length - 1; index > -1; --index) {
            let value = map[index].spritePos - 1;
            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let destination_x = map[index].xPos;
            let destination_y = map[index].yPos;
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, tileSize, tileSize);
        }

    };

    /**
     *
     * @param tile_size - Size of the individual Image
     * @param col - Number of Columns (Total Image Width/number of images)
     * @returns {Display}
     */
    tileSheet(tile_size, col) {
        this.tile_size = tile_size;
        this.columns = col;
        return this;
    };

    /**
     *
     * @param playerX - Player X position
     */
    updateView(playerX) {
        camView.x = playerX - 200;
        if (camView.x < 0) {
            camView.x = 0;
        }
        if (camView.x >= (1020 * 5) - camView.width) {
            camView.x = 1020 * 5 - camView.width;
        }
    }

    /**
     *
     * @param player - Player Object
     * @param attack - Check if the player is attacking
     */
    updateAnimation(player, attack) {
        let imageWidth = 25;
        let imageHeight = 20;

        //Attack Left
        if (player.direction_x > 0) {
            if (attack) {
                this.buffer.drawImage(this.chara_img, 286, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else if (player.velocity_y > 0 ){
                this.buffer.drawImage(this.chara_img, 424, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            //Walk Right
            else if (player.velocity_x > 0.1) {
                this.buffer.drawImage(this.chara_img, 516, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else if(player.getHurt){
                this.buffer.drawImage(this.chara_img, 378, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            //Stand Right
            else {
                this.buffer.drawImage(this.chara_img, 470, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
        }


        //Update Left
        if (player.direction_x < 0) {
            if (attack) {
                this.buffer.drawImage(this.chara_img, 10, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else if (player.velocity_y > 0){
                this.buffer.drawImage(this.chara_img, 148, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else if (player.velocity_x < -0.1) {
                this.buffer.drawImage(this.chara_img, 240, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else if(player.getHurt){
                this.buffer.drawImage(this.chara_img, 102, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
            else {
                this.buffer.drawImage(this.chara_img, 194, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
        }


    }


    /**
     *
     * @param xPos - X position
     * @param yPos - Y position
     * @param displayMenu - Canvas Context
     */
    displayInstructions(xPos,yPos, displayMenu){
        let buffer = this.buffer;
        let xSpace = xPos + 350;

        buffer.fillStyle = 'black';
        if(displayMenu){
            buffer.fillText('', xSpace, yPos);
            buffer.fillText('Press Q to Attack', xSpace, yPos);
            buffer.fillText('Press E to toggle Built or Gather Mode', xSpace, yPos + 15);
            buffer.fillText('Press W or Up to Jump', xSpace, yPos + 30);
            buffer.fillText('Press A or Left to move Left', xSpace, yPos + 45);
            buffer.fillText('Press D or Right to move Right', xSpace, yPos + 60);
            buffer.fillText('Press S to consume berries on the ground', xSpace, yPos + 75);
            buffer.fillText('Press 1 to 9 for Select Slot Items', xSpace, yPos + 90);
        } else {
            buffer.fillText('Press F to display help menu', xSpace, yPos);
        }
    }

}
