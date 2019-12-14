class World {

    constructor() {
        this.friction = 0.9;
        this.gravity = 3;
        this.height = 625;
        this.width = 850 * 5;
        // this.width = 450;
        this.player = new Player(300, 0, 40, 20);
    }

    collideObject(player, map) {
        let i;
        //Check for undefined
        if (Array.isArray(map)) {
            for (i = 0; i < map.length; i++) {

                if (player.x < map[i].xPos + 25 && player.x + player.width > map[i].xPos && player.y < map[i].yPos + 25 && player.y + player.height > map[i].yPos) {
                    if (map[i].state === 2) {

                        if (player.y + player.height >= map[i].yPos + 20) {

                            if ((player.y < map[i].yPos + 25) && player.x > map[i].xPos) {
                                player.jumping = false;
                                player.x += 3;
                                player.velocity_x = 0;
                            }
                            if ((player.y < map[i].yPos + 25) && player.x <= map[i].xPos) {
                                player.jumping = false;
                                player.x -= 3;
                                player.velocity_x = 0;
                            }
                            if ((player.y + player.height >= map[i].yPos) && (player.y < map[i].yPos + 25)) {
                                player.jumping = true;
                                player.velocity_y = 0;
                            }
                            if (player.y < map[i].yPos + 25) {
                                player.jumping = true;
                                player.velocity_y = 0;
                            }
                        } else {
                            player.jumping = false;
                            player.y = map[i].yPos - player.height;
                            player.velocity_y = 0;
                        }

                    }
                    if ((map[i].yPos < 75) || (map[i].state === 1)) {
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

    generateMap() {
        let blockType;
        let mapArray = [];
        let mapHeight = this.height;
        let mapWidth = this.width;
        let yMap;
        let xMap;


        for (yMap = 0; yMap < mapHeight; yMap += 25) {

            //Sky
            if (yMap <= 75) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                    mapArray.push(this.skyblock);
                }
            }

            //Trees
            if (yMap >= 100 && yMap <= 175) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
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

            if (yMap >= 200 && yMap <= 300) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (yMap === 200) {
                        this.grassLayer = new blockData('grass', 2, yMap, xMap, 1);
                        mapArray.push(this.grassLayer);
                    }
                    if (yMap === 225) {
                        this.dirtLayer = new blockData('dirt', 2, yMap, xMap, 2);
                        mapArray.push(this.dirtLayer);
                    }
                    if (yMap >= 250 && yMap <= 300) {
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

            if (yMap >= 325 && yMap <= 425) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (blockType >= .7) {
                        this.coal = new blockData('coal', 2, yMap, xMap, 14);
                        mapArray.push(this.coal);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

            if (yMap >= 450 && yMap <= 550) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (blockType >= .7) {
                        this.copper = new blockData('copper', 2, yMap, xMap, 10);
                        mapArray.push(this.copper);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

            if (yMap >= 575 && yMap < mapHeight) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (yMap === 600) {
                        this.bedrock = new blockData('bedrock', 2, yMap, xMap, 8);
                        mapArray.push(this.bedrock);
                    }
                    if (blockType >= .9) {
                        this.diamond = new blockData('diamond', 2, yMap, xMap, 11);
                        mapArray.push(this.diamond);
                    } else {
                        this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                        mapArray.push(this.stoneLayer);
                    }
                }
            }

        }

        return mapArray;

    }

}

