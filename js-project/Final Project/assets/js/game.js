class Game {
    constructor(object) {
        this.world = new World();

        this.update();

        this.map = this.world.generateMap();
    }

    update() {
        this.world.update(this.map);
    };


}