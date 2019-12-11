class Display {

    constructor(canvas) {
        this.buffer = document.createElement("canvas").getContext("2d");
        this.context = canvas.getContext("2d");
        this.tile_sheet = this.tileSheet(80 ,6);
        this.image = new Image();
    }

    // drawRectangle = (x, y, width, height, color) => {
    //     this.buffer.fillStyle = color;
    //     this.buffer.fillRect(Math.floor(x), Math.floor(y), width, height);
    // };

    drawPlayer(rectangle, color1, color2) {
        this.buffer.fillStyle = color1;
        this.buffer.fillRect(Math.floor(rectangle.x), Math.floor(rectangle.y), rectangle.width, rectangle.height);
        this.buffer.fillStyle = color2;
        this.buffer.fillRect(Math.floor(rectangle.x + 2), Math.floor(rectangle.y + 2), rectangle.width - 4, rectangle.height - 4);

    };

    fill = (color) => {
        this.buffer.fillStyle = color;
        this.buffer.fillRect(0, 0, this.buffer.canvas.width, this.buffer.canvas.height);
    };

    render = () => {
        this.context.drawImage(this.buffer.canvas, 0, 0, this.buffer.canvas.width, this.buffer.canvas.height, 0, 0, this.context.canvas.width, this.context.canvas.height);
    };

    resize = (width, height, height_width_ratio) => {
        if (height / width > height_width_ratio) {
            this.context.canvas.height = width * height_width_ratio;
            this.context.canvas.width = width;
        } else {

            this.context.canvas.height = height;
            this.context.canvas.width = height / height_width_ratio;

        }
        this.context.imageSmoothingEnabled = false;
    };

    drawMap = (map, columns) => {

        // console.log(map);
        // let columns = this.context.canvas.offsetWidth / 25;
        for (let index = map.length - 1; index > -1; -- index) {
            let value = map[index].spritePos - 1;
            // console.log(map[index].spritePos - 1);
            let source_x =           (value % this.tile_sheet.columns) * this.tile_sheet.tile_size;
            let source_y = Math.floor(value / this.tile_sheet.columns) * this.tile_sheet.tile_size;

            // let destination_x =           (index % columns) * this.tile_sheet.tile_size ;
            // let destination_y = Math.floor(index / columns) * this.tile_sheet.tile_size ;

            let destination_x = map[index].xPos;
            let destination_y = map[index].yPos;


            // this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size);
            this.buffer.drawImage(this.tile_sheet.image, source_x, source_y, this.tile_sheet.tile_size, this.tile_sheet.tile_size, destination_x, destination_y, 25, 25);
        }


    };


    tileSheet = (tile_size, col) => {
        this.tile_size = tile_size;
        this.columns = col;
        return this;
    };

    drawGrid() {
        let bw = this.context.canvas.offsetWidth;
        let bh = this.context.canvas.offsetHeight;
        let p = 0;

        for (var width = 0; width < bw; width += 20) {
            this.context.moveTo(0.5 + width + p, p);
            this.context.lineTo(0.5 + width + p, bh + p);
        }

        for (var height = 0; height < bh; height += 20) {
            this.context.moveTo(p, 0.5 + height + p);
            this.context.lineTo(bw + p, 0.5 + height + p);
        }
        this.context.strokeStyle = "black";
        this.context.stroke();

    };

}
