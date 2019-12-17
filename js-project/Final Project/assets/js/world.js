class World {

    constructor() {
        this.friction = 0.85;
        this.gravity = 3;

        this.height = 750;
        this.width = 1020 * 5;

        this.player = new Player(300, 0, 40, 30);
    }

    generateMap() {
        let blockType;
        let mapArray = [];
        let mapHeight = this.height;
        let mapWidth = this.width;
        let yMap;
        let xMap;
        let tileSize = 30;


        for (yMap = 0; yMap < mapHeight; yMap += tileSize) {

            //Sky
            if (yMap <= tileSize*3) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                    mapArray.push(this.skyblock);
                }
            }

            //Trees
            if (yMap >= tileSize*4 && yMap <= tileSize*7) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    blockType = Math.random();
                    if (blockType >= .1) {
                        this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                        mapArray.push(this.skyblock);
                    }
                    if (blockType <= .1) {
                        this.groundBlock = new blockData('wood', 2, yMap, xMap, 6);
                        mapArray.push(this.groundBlock);
                    }
                }
            }

            if (yMap >= tileSize*8 && yMap <= tileSize*12) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    blockType = Math.random();
                    if (yMap === tileSize*8) {
                        this.grassLayer = new blockData('grass', 2, yMap, xMap, 1);
                        mapArray.push(this.grassLayer);
                    }
                    if (yMap === tileSize*9) {
                        this.dirtLayer = new blockData('dirt', 2, yMap, xMap, 2);
                        mapArray.push(this.dirtLayer);
                    }
                    if (yMap >= tileSize*10 && yMap <= tileSize*12) {
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

            if (yMap >= tileSize*13 && yMap <= tileSize*17) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    blockType = Math.random();
                    if (blockType >= .8) {
                        this.coal = new blockData('coal', 2, yMap, xMap, 14);
                        mapArray.push(this.coal);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

            if (yMap >= tileSize*18 && yMap <= tileSize*22) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    blockType = Math.random();
                    if (blockType >= .8) {
                        this.copper = new blockData('copper', 2, yMap, xMap, 16);
                        mapArray.push(this.copper);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

            if (yMap >= tileSize*23 && yMap < mapHeight) {
                for (xMap = 0; xMap < mapWidth; xMap += tileSize) {
                    blockType = Math.random();
                    if (yMap === tileSize*24) {
                        this.bedrock = new blockData('bedrock', 2, yMap, xMap, 15);
                        mapArray.push(this.bedrock);
                    }
                    if (blockType >= .9) {
                        this.gold = new blockData('gold', 2, yMap, xMap, 10);
                        mapArray.push(this.gold);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

        }

        return mapArray;

    }

    collideObject(player, map) {
        let i;
        //Check for undefined
        let tileSize = 25;
        if (Array.isArray(map)) {
            for (i = 0; i < map.length; i++) {

                if (player.x < map[i].xPos + tileSize && player.x + player.width > map[i].xPos && player.y < map[i].yPos + tileSize && player.y + player.height > map[i].yPos) {
                    if (map[i].state === 2) {

                        if (player.y + player.height >= map[i].yPos + 20) {

                            if ((player.y < map[i].yPos + tileSize) && player.x > map[i].xPos) {
                                player.jumping = false;
                                player.x += 1;
                                player.velocity_x = 0;
                            }
                            if ((player.y < map[i].yPos + tileSize + 5) && player.x <= map[i].xPos) {
                                player.jumping = false;
                                player.x -= 1;
                                player.velocity_x = 0;
                            }
                            if ((player.y + player.height >= map[i].yPos) && (player.y < map[i].yPos + 30)) {
                                player.jumping = true;
                                player.velocity_y = 0;
                            }
                            if (player.y < map[i].yPos + 20) {
                                player.jumping = true;
                                player.velocity_y = 0;
                            }
                        } else {
                            player.jumping = false;
                            player.y = map[i].yPos - player.height;
                            player.velocity_y = 0;
                        }

                    }
                    if ((map[i].yPos < tileSize*3) || (map[i].state === 1)) {
                        player.jumping = true;
                    }

                }

                if ((player.x < 0) || (player.x >= this.width)) {
                    player.x = 0;
                    player.velocity_x = 0;
                }


            }
        }

    };

    update(map) {
        if (this.player.jumping) {
            this.player.velocity_y += this.gravity;
        }

        this.player.update();

        this.player.velocity_x *= this.friction;
        this.player.velocity_y *= this.friction;

        this.collideObject(this.player, map);

    }


}

