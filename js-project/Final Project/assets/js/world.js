class World {

    constructor() {
        this.friction = 0.9;
        this.gravity = 3;
        this.height = 475;
        this.width = 850;
        this.player = new Player(0, 0, 40, 20);
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
                                player.x += 1;
                                player.velocity_x = 0;
                            }
                            if ((player.y < map[i].yPos + 25) && player.x <= map[i].xPos) {
                                player.jumping = false;
                                player.x -= 1;
                                player.velocity_x = 0;
                            }
                            if ((player.y + player.height >= map[i].yPos) &&(player.y < map[i].yPos + 25)){
                                console.log("What");
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
                    if ((map[i].yPos < 75) ||(map[i].state === 1)) {
                        player.jumping = true;
                    }
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

            if (yMap <= 75) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                    mapArray.push(this.skyblock);
                }
            }
            if (yMap >= 100 && yMap <= 200) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (blockType >= .1) {
                        this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                        mapArray.push(this.skyblock);
                    }
                    if (blockType <= .1) {
                        this.groundBlock = new blockData('dirt', 2, yMap, xMap, 2);
                        mapArray.push(this.groundBlock);

                    }
                }
            }

            if (yMap >= 225 && yMap <= 350) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();
                    if (yMap === 225) {
                        this.grassLayer = new blockData('grass', 2, yMap, xMap, 1);
                        mapArray.push(this.grassLayer);
                    }
                    if (yMap === 250) {
                        this.dirtLayer = new blockData('dirt', 2, yMap, xMap, 2);
                        mapArray.push(this.dirtLayer);
                    }
                    if (yMap > 250) {
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

            if (yMap >= 375 && yMap < mapHeight) {

                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();

                    if (yMap === 450) {
                        this.bedrock = new blockData('bedrock', 2, yMap, xMap, 8);
                        mapArray.push(this.bedrock);
                    }

                    if (yMap >= 375 && yMap <= 400) {
                        if (blockType >= .7) {
                            this.copper = new blockData('copper', 2, yMap, xMap, 10);
                            mapArray.push(this.copper);
                        } else {
                            this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                            mapArray.push(this.stoneLayer);
                        }
                    }
                    if (yMap > 400 && yMap < 450) {
                        if (blockType > .6) {
                            this.stoneLayer = new blockData('stone', 2, yMap, xMap, 3);
                            mapArray.push(this.stoneLayer);
                        } else {
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

