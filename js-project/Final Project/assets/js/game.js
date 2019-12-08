class Game{
    constructor(object){
        this.world = new World();
        this.update();

        this.map = [1,18,18,18,50,49,19,20,17,18,36,37,
            11,40,40,40,17,19,40,32,32,32,40,8,
            11,32,40,32,32,32,40,13,6,6,29,2,
            36,7,40,40,32,40,40,20,40,40,9,10,
            3,32,32,48,40,48,40,32,32,5,37,26,
            11,40,40,32,40,40,40,32,32,32,40,38,
            11,40,32,5,15,7,40,40,4,40,1,43,
            50,3,32,32,12,40,40,32,12,1,43,10,
            9,41,28,14,38,28,14,4,23,35,10,25];

        this.columns   = 12;
    }

    update() {
        this.world.update();
    };

    generateMap() {

        this.rows      = 9;
        this.tile_size = 16;


        /* Height and Width now depend on the map size. */
        this.height   = this.tile_size * this.rows;
        this.width    = this.tile_size * this.columns;
    }
}