class Game {
    constructor(object) {
        this.world = new World();
        this.update();

        // this.map = [1, 18, 18, 18, 50, 49, 19, 20, 17, 18, 36, 37,
        //     11, 40, 40, 40, 17, 19, 40, 32, 32, 32, 40, 8,
        //     11, 32, 40, 32, 32, 32, 40, 13, 6, 6, 29, 2,
        //     36, 7, 40, 40, 32, 40, 40, 20, 40, 40, 9, 10,
        //     3, 32, 32, 48, 40, 48, 40, 32, 32, 5, 37, 26,
        //     11, 40, 40, 32, 40, 40, 40, 32, 32, 32, 40, 38,
        //     11, 40, 32, 5, 15, 7, 40, 40, 4, 40, 1, 43,
        //     50, 3, 32, 32, 12, 40, 40, 32, 12, 1, 43, 10,
        //     9, 41, 28, 14, 38, 28, 14, 4, 23, 35, 10, 25];

        this.map = this.generateMap();
        // this.map = [
        //     1,1,1,1,1,1,1,1,1,1,
        //     1,1,1,1,1,1,1,1,1,1,
        //     1,1,1,1,1,1,1,1,1,1,
        //     1,1,1,1,1,1
        // ]
        //
    }

    update() {
        this.world.update();
    };

    generateMap() {
        let context = document.querySelector("canvas").getContext('2d');
        let blockType;
        let mapArray = [];
        let mapHeight = 400;
        let mapWidth = 800;
        let yMap;
        let xMap;
        for (yMap = 0; yMap < mapHeight; yMap += 20) {

            if (yMap <= 120) {
                for (xMap = 0; xMap < mapWidth; xMap += 20) {
                    this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                    mapArray.push(this.skyblock);
                }
            }
            if (yMap >= 120 && yMap < 200) {
                for (xMap = 0; xMap < mapWidth; xMap += 20) {
                    blockType = Math.random();
                    if (blockType >= .1) {
                        this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                        mapArray.push(this.skyblock);
                    }
                    if (blockType <= .1) {
                        this.groundBlock = new blockData('grass', 2, yMap, xMap, 1);
                        mapArray.push(this.groundBlock);
                    }

                }
            }
            if (yMap >= 200 && yMap < 300) {
                for (xMap = 0; xMap < mapWidth; xMap += 20) {
                    blockType = Math.random();
                    if (yMap === 200) {
                        this.grassLayer = new blockData('grass', 2, yMap, xMap, 1);
                        mapArray.push(this.grassLayer);
                    }
                    if (yMap === 220) {
                        this.dirtLayer = new blockData('dirt', 2, yMap, xMap, 2);
                        mapArray.push(this.dirtLayer);
                    } else {
                        if (blockType >= .5) {
                            this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                            mapArray.push(this.stoneLayer);
                        } else {
                            this.dirtLayer = new blockData('dirt', 2, yMap, xMap, 2);
                            mapArray.push(this.dirtLayer);
                        }
                    }

                }
            }

            if (yMap >= 300 && yMap <= 400) {

                for (xMap = 0; xMap < mapWidth; xMap += 20) {
                    blockType = Math.random();

                    if (yMap === 380) {
                        this.bedrock = new blockData('bedrock', 2, yMap, xMap, 8);
                        mapArray.push(this.bedrock);
                    }

                    if (yMap >= 300 && yMap < 380) {
                        if (blockType >= .9) {
                            this.copper = new blockData('copper', 2, yMap, xMap, 10);
                            mapArray.push(this.copper);
                        }

                        if (blockType < .85) {
                            this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                            mapArray.push(this.stoneLayer);
                        }

                        else {
                            this.coal = new blockData('coal', 2, yMap, xMap, 14);
                            mapArray.push(this.coal);

                        }
                    }

                }
            }
        }

        return mapArray;


    }
}