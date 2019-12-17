class Game {

    constructor() {
        this.world = new World();
        this.map = this.world.generateMap();
        this.update();

        this.inventory = new Inventory();
        this.skillChecker = new SkillChecker();
        this.recipe = new Recipes();
        this.player = this.world.player;

    }

    update() {
        this.world.update(this.map);
    };

    /**
     *
     * @param y - Y Position Of the Status
     * @param display - Buffer for Canvas Input
     * @param clickType - Listener for Click state
     */
    displayStatus = (y, display, clickType) => {
        let xPos = this.player.x;
        let statusYPos = 30;
        let statusXPos = 80;
        let miningLevel = this.player.miningPower;
        let buffer = display.buffer;

        let status;
        if (clickType === 1) {
            status = 'Build';
        } else {
            status = 'Gather';
        }

        buffer.fillStyle = 'red';
        buffer.fillText("Health: " + this.player.getHealthPoint(), xPos, y + statusYPos);
        buffer.fillStyle = 'brown';
        buffer.fillText("Mining Level: " + miningLevel, xPos + statusXPos, y + statusYPos);
        buffer.fillStyle = 'black';
        buffer.fillText("(Press Q to Attack) Attack Power: " + this.player.attack, xPos + statusXPos * 2, y + statusYPos);
        // buffer.fillText("Armour Level: " + this.player.attack, xPos + statusXPos *2, y + statusYPos);
        buffer.fillStyle = 'red';
        buffer.fillText("(Press E to Toggle) Click Type: " + status, xPos + 360, y + 5);
    };

    /**
     *
     * @param e - Click event param
     * @param canvas - Buffer for Canvas Input
     * @param map Map - Array for the Tiles on Canvas
     * @param player - Player Object
     * @param type - Listener for Click state
     */
    getClick(e, canvas, map, player, type) {
        let tileSize = 30;
        let itemIndex;
        let mX;
        // mX = e.offsetX + (camView.x);
        mX = e.offsetX + (camView.x);
        let mY = e.offsetY;
        let col = canvas.width / tileSize;
        let index = (Math.floor(mX / tileSize)) + col * Math.floor(mY / tileSize);
        //Gathering Mode
        if (type === 0) {
            for (let i = 0; i < map.length; i++) {
                if ((player.x + tileSize * 2 >= mX) && (mX + tileSize * 2 >= player.x) && (mY + tileSize * 2 >= player.y) && (player.y + tileSize * 2 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state !== 1)) {
                        if (this.skillChecker.checkSkillMatch(player.getMiningLevel(), map[index].material)) {
                            if (this.inventory.items.length <= this.inventory.maxItem) {
                                itemIndex = index;
                                break;
                            }
                        }
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

        //Building Mode
        if (type === 1) {
            for (let i = 0; i < map.length; i++) {
                if ((player.x + tileSize * 2 >= mX) && (mX + tileSize * 2 >= player.x) && (mY + tileSize * 2 >= player.y) && (player.y + tileSize * 3 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state === 1)) {
                        itemIndex = index;
                        break;
                    }
                }
            }
            if ((itemIndex) && (this.inventory.items.length > 0)) {
                map[itemIndex].material = this.inventory.items[0].material;
                map[itemIndex].state = 2;
                map[itemIndex].spritePos = this.inventory.items[0].spritePos;
                this.inventory.items.splice(0, 1);
            }
        }

    }

    /**
     *
     * @param playerX - Player X position
     * @param display - Buffer For Canvas Input
     */
    updateInventory(playerX, display) {
        let tile_sheet = display.tile_sheet;
        let buffer = display.buffer;

        for (let index = 0; index < this.inventory.items.length; index++) {
            let item = this.inventory.items[index];
            let dest_x = playerX + (index * 16);
            let value = item.spritePos - 1;
            let source_x = (value % tile_sheet.columns) * tile_sheet.tile_size;
            let source_y = Math.floor(value / tile_sheet.columns) * tile_sheet.tile_size;
            buffer.drawImage(tile_sheet.image, source_x, source_y, tile_sheet.tile_size, tile_sheet.tile_size, dest_x, 10, 15, 15);
        }
    }

    /**
     *
     * @param player - Player Object
     */
    upgrades(player, display, upgrade) {
        let buffer = display.buffer;
        let itemInventory = this.inventory.items;
        let recipe = this.recipe;
        let itemUpgrade = recipe.checkUpgradePix(itemInventory);
        let attackUpgrade = recipe.checkWeaponUpgrade(itemInventory);
        buffer.fillStyle = 'black';

        //Pix Power
        if (itemUpgrade > 0) {
            if ((player.getMiningLevel() === 1) && (itemUpgrade === 1)) {
                buffer.fillText('Press Z to Upgrade Pix Power', player.x - 20, player.y - 10);
                if (upgrade === 1) {
                    player.levelUpPix();
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory.splice(i);
                            buffer.fillText('', player.x - 20, player.y - 10);
                        }
                    }
                }
            }
            if ((player.getMiningLevel() === 2) && (itemUpgrade === 2)) {
                buffer.fillText('Press Z to Upgrade Pix Power', player.x - 20, player.y - 10);
                if (upgrade === 1) {
                    player.levelUpPix();
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory.splice(i, 1);
                            buffer.fillText('', player.x - 20, player.y - 10);
                        }
                    }
                }

            }
        }

        //Weapon Upgrade
        if (attackUpgrade > 0) {
            if ((player.getAttackPower() === 10) && (attackUpgrade === 1)) {
                buffer.fillText('Press X to Upgrade Attack Power', player.x - 20, player.y - 20);
                if(upgrade === 2){
                    player.levelUpAttack(10);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory.splice(i);
                            buffer.fillText('Press U to Upgrade Pix Power', player.x - 20, player.y - 20);
                        }
                    }
                }
            }
            if ((player.getAttackPower() === 20) && (attackUpgrade === 2)) {
                buffer.fillText('Press X to Upgrade Attack Power', player.x - 20, player.y - 20);
                if(upgrade === 2){
                    player.levelUpAttack(20);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory.splice(i, 1);
                        }
                    }
                }
            }

        }

    }

    /**
     *
     * @param map - May Array to Use For Collision Detection
     * @param display - Buffer for Canvas Input
     * @param mob
     */
    updateMob(map, display, mob) {
        let tileSize = 30;
        let counterIndex;
        // let mobArray = [];
        for (counterIndex = 0; counterIndex < mob.length; counterIndex++) {
            mob[counterIndex].y += this.world.gravity;
            if (mob[counterIndex].x > this.player.x) {
                mob[counterIndex].x -= 2;
            }
            if (mob[counterIndex].x < this.player.x) {
                mob[counterIndex].x += 2;
            }
            for (var i = 0; i < map.length; i++) {

                if (mob[counterIndex].x < map[i].xPos + tileSize && mob[counterIndex].x + 20 > map[i].xPos && mob[counterIndex].y < map[i].yPos + tileSize && mob[counterIndex].y + 20 > map[i].yPos) {
                    if (map[i].state === 2) {
                        if (mob[counterIndex].y + 20 >= map[i].yPos + 20) {

                            //Right Side
                            if ((mob[counterIndex].y < map[i].yPos + tileSize) && mob[counterIndex].x <= map[i].xPos) {
                                mob[counterIndex].x -= 5;
                                mob[counterIndex].y -= 60;
                                mob[counterIndex].x += 5;
                            }

                            //Left Side
                            if ((mob[counterIndex].y < map[i].yPos + tileSize) && mob[counterIndex].x > map[i].xPos) {
                                mob[counterIndex].x += 5;
                                mob[counterIndex].y -= 60;
                                mob[counterIndex].x -= 5;
                            }

                            if ((mob[counterIndex].y + 20 >= map[i].yPos) && (mob[counterIndex].y < map[i].yPos + tileSize)) {
                                mob[counterIndex].y -= 0;
                            }

                        } else {
                            mob[counterIndex].y = map[i].yPos - 20;
                        }
                    }
                }

            }
            display.buffer.fillRect(mob[counterIndex].x, mob[counterIndex].y, 20, 20);
        }

    }

    /**
     *
     * @param attack - Listener for Player Attack Input
     * @param mob - Mob Object
     */
    attackMob(attack, mob) {
        let tileSize = 30;
        let mobArray = mob;
        let mobCount, mobIndex;
        if (attack) {
            for (mobCount = 0; mobCount < mobArray.length; mobCount++) {
                let mob = mobArray[mobCount];
                if (mob.x - tileSize < this.player.x && mob.x + tileSize > this.player.x) {
                    if (mob.y - tileSize < this.player.y && mob.y + tileSize > this.player.y) {
                        if (mob.state === 3) {
                            mobIndex = mobCount;
                            break;
                        }
                    }
                }

            }
            if (mobIndex >= 0) {
                let mobHp = mobArray[mobIndex].mobHp;
                mobArray[mobIndex].getDamage(this.player.getAttackPower());
                this.player.getDamage(mobArray[mobIndex].getMobAttack());
                console.log(mobHp);
                if (mobArray[mobIndex].mobHp <= 0) {
                    mobArray.splice(mobIndex, 1);
                }

            }
        }

    }


}