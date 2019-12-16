var camView = {
    x: 0,
    y: 0,
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
};

class Display {

    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");

        this.tile_sheet = this.tileSheet(80, 6);
        this.image = new Image();
        this.chara_img = new Image();
    }

    drawRectangle = (x, y, width, height, color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };

    drawGrid() {
        let bw = this.context.canvas.offsetWidth;
        let bh = this.context.canvas.offsetHeight;
        let p = 0;

        for (let width = 0; width < bw; width += 25) {
            this.context.moveTo(0.5 + width + p, p);
            this.context.lineTo(0.5 + width + p, bh + p);
        }

        for (let height = 0; height < bh; height += 25) {
            this.context.moveTo(p, 0.5 + height + p);
            this.context.lineTo(bw + p, 0.5 + height + p);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();

    };

    drawPlayer(rectangle, color1, color2) {
        this.buffer.fillStyle = color1;
        this.buffer.fillRect(Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
        this.buffer.fillStyle = color2;
        this.buffer.fillRect(Math.floor(rectangle.x + 2), Math.floor(rectangle.y + 2), rectangle.width - 4, rectangle.height - 4);
    };

    drawInventory = (x, y, width, height, color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };


    drawObject(image, source_x, source_y, destination_x, destination_y, width, height) {
        this.buffer.drawImage(image, source_x, source_y, width, height, Math.round(destination_x), Math.round(destination_y), width, height);
    };


    drawChara(player) {
        this.buffer.drawImage(this.chara_img, Math.floor(player.x), Math.floor(player.y), player.width, player.height)
    }


    render() {
        this.context.save();
        this.context.translate(-camView.x, camView.y);
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.restore();
    };

    loadCanvas(width, height) {
        this.context.canvas.width = width;
        this.context.canvas.height = height;
    }

    resize(width, height, height_width_ratio) {
        if (height / width > height_width_ratio) {
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;
        } else {
            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;
        }
        this.context.imageSmoothingEnabled = false;
    };

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

    tileSheet(tile_size, col) {
        this.tile_size = tile_size;
        this.columns = col;
        return this;
    };

    updateView(playerX) {
        camView.x = playerX - 200;
        if (camView.x < 0) {
            camView.x = 0;
        }
        if (camView.x >= (1020 * 5) - camView.width) {
            camView.x = 1020 * 5 - camView.width;
        }
    }

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
            else {
                this.buffer.drawImage(this.chara_img, 194, 10, imageWidth, imageHeight, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
        }


    }


}
