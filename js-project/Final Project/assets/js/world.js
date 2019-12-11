class World {
    constructor() {
        this.friction = 0.9;
        this.gravity = 3;
        this.height = 425;
        this.width = 850;
        this.player = new Player(0, 0, 40, 20);

    }

    collideObject(player, map) {
        let i;
        let tile_size = 20;
        let columns = 40;


        //Check for undefined
        if (Array.isArray(map)) {

            for (i = 0; i < map.length; i++) {
                var check = this.checkCollision(player.x, player.y, map[i].xPos, map[i].yPos, player.height, player.width);
                if (check) {
                    if (map[i].state === 2) {

                        // if(player.y + player.height >= map[i].yPos + 20) {
                        //     player.jumping = true;
                        //     if(player.x + 20 > map[i].xPos){
                        //         player.x += 5;
                        //         player.velocity_x = 0;
                        //     }
                        // }
                        //
                        // if(player.y + player.height >= map[i].yPos + 20) {
                        //     player.jumping = true;
                        //     if(player.x < map[i].xPos + 20){
                        //         player.x -= 5;
                        //         player.velocity_x = 0;
                        //     }
                        // }

                        if (player.y + player.height >= map[i].yPos + 20) {

                            var checker = this.checkXCollision(player.x, map[i].xPos);
                            switch (checker) {

                                case 1 :
                                    player.jumping = false;
                                    player.x += 1;
                                    player.velocity_x = 0;
                                    break;

                                case 2:
                                    player.jumping = false;
                                    player.x -= 1;
                                    player.velocity_x = 0;
                                    break;
                            }

                        }
                        else {
                            player.jumping = false;
                            player.y = map[i].yPos - player.height;
                            player.velocity_y = 0;
                        }

                    }
                    if (map[i].state === 1) {
                        player.jumping = true;
                    }
                }
            }
        }

    };


    checkCollision(playerX, playerY, mapX, mapY, height, width) {
        // if (playerY + player.height >= map[i].yPos && playerY <= map[i].yPos + 40) {
        //     if (player.x + player.width >= map[i].xPos && player.x < map[i].xPos + 20) {
        //         if (map[i].state === 2) {
        //             player.jumping = false;
        //             player.y = map[i].yPos - player.height;
        //             player.velocity_y = 0;
        //             player.velocity_x = 0;
        //         }
        //     }
        // }
        if (playerY + height >= mapY && playerY <= mapY + 40) {
            if (playerX + width >= mapX && playerX < mapX + 20) {
                return true;
            }
        }

        if (playerX + width >= mapX && playerX <= mapX + 20) {
            return false;
        }
    }

    checkXCollision(xPos, mapXPos) {
        if (xPos + 20 > mapXPos) {
            return 1;
        }
        if (xPos < mapXPos + 20) {
            return 2;
        }

    }

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

            if (yMap <= 120) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    this.skyblock = new blockData('air', 1, yMap, xMap, 9);
                    mapArray.push(this.skyblock);
                }
            }
            if (yMap >= 120 && yMap < 200) {
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

            if (yMap >= 200 && yMap <= 300) {
                for (xMap = 0; xMap < mapWidth; xMap += 25) {
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

            if (yMap >= 300 && yMap <= mapHeight) {

                for (xMap = 0; xMap < mapWidth; xMap += 25) {
                    blockType = Math.random();

                    if (yMap === 400) {
                        this.bedrock = new blockData('bedrock', 2, yMap, xMap, 8);
                        mapArray.push(this.bedrock);
                    }

                    if (yMap >= 300 && yMap <380) {
                        if (blockType >= .9) {
                            this.copper = new blockData('copper', 2, yMap, xMap, 10);
                            mapArray.push(this.copper);
                        }

                        if (blockType < .85) {
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

