var camView = {
    x: 0,
    y: 0,
    width: document.body.offsetWidth,
    height: document.body.offsetHeight
};

class Display {

    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.buffer.id = 'gameCanvas';
        this.context = canvas.getContext("2d");

        this.tile_sheet = this.tileSheet(80, 6);
        this.image = new Image();
        this.chara_img = new Image();

        this.leftMove = [44, 76, 108, 44, 76, 108];

        this.inventory = new Inventory();

    }

    drawRectangle = (x, y, width, height, color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };

    drawInventory = (x, y, width, height, color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    };


    drawPlayer(rectangle, color1, color2) {
        this.buffer.fillStyle = color1;
        this.buffer.fillRect(Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
        this.buffer.fillStyle = color2;
        this.buffer.fillRect(Math.floor(rectangle.x + 2), Math.floor(rectangle.y + 2), rectangle.width - 4, rectangle.height - 4);
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
        for (let index = map.length - 1; index > -1; --index) {
            let value = map[index].spritePos - 1;
            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let destination_x = map[index].xPos;
            let destination_y = map[index].yPos;
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, 25, 25);
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
        if (camView.x >= (850 * 5) - camView.width) {
            camView.x = 850 * 5 - camView.width;
        }
    }

    updateAnimation(player) {

        //Update Right
        if (player.direction_x > 0) {
            if (player.velocity_x > 0.1) {
                this.buffer.drawImage(this.chara_img, this.leftMove[0], 10, 14, 20, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            } else {
                this.buffer.drawImage(this.chara_img, 10, 10, 14, 20, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
        }
        //Update Left
        if (player.direction_x < 0) {
            if (player.velocity_x < -0.1) {
                this.buffer.drawImage(this.chara_img, 278, 10, 14, 20, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            } else {
                this.buffer.drawImage(this.chara_img, 212, 10, 14, 20, Math.floor(player.x), Math.floor(player.y), player.width, player.height);
            }
        }

    }

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

    getClick(e, canvas, map, player, type) {
        let itemIndex;
        let mX;
        mX = e.offsetX + (camView.x);
        let mY = e.offsetY;
        let col = canvas.width / 25;
        let index = (Math.floor(mX / 25)) + col * Math.floor(mY / 25);
        console.log(type);
        console.log(this.inventory.items[0]);
        if(type === 0){
            for (let i = 0; i < map.length; i++) {
                if ((player.x + 50 >= mX) && (mX + 50 >= player.x) && (mY + 50 >= player.y) && (player.y + 75 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state !== 1)) {
                        itemIndex = index;
                        break;
                    }
                }
            }

            if (itemIndex) {
                let itemArray = map[itemIndex];
                let addedItem = new blockData(itemArray.getMaterial(), itemArray.getState(), itemArray.getXpos(), itemArray.getYpos(), itemArray.getSpritePos());
                this.inventory.items.push(addedItem);
                map[itemIndex].spritePos = 9;
                map[itemIndex].state = 1;
                map[itemIndex].material = 'air';
            }
        }

        if(type === 1){
            for (let i = 0; i < map.length; i++) {
                if ((player.x + 50 >= mX) && (mX + 50 >= player.x) && (mY + 50 >= player.y) && (player.y + 75 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state === 1)) {
                        itemIndex = index;
                        break;
                    }
                }
            }
            if (itemIndex) {
                console.log(itemIndex);
                map[itemIndex].material = this.inventory.items[0];
                map[itemIndex].state = 2;
                map[itemIndex].spritePos = this.inventory.items[0].spritePos;
                this.inventory.items.splice(0, 1);
            }

        }

    }


    updateInventory(playerX) {
        for (let index = 0; index < this.inventory.items.length; index++) {
            let item = this.inventory.items[index];
            let itemArray = this.inventory.items;
            let dest_x = playerX + (index * 25);
            let value = item.spritePos - 1;
            let source_x = (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, dest_x, 10, 25, 25);
        }
    }




}
