class Game {

    constructor() {
        this.world = new World();
        this.map = this.world.generateMap();
        this.update();

        this.inventory = new Inventory();
        this.skillChecker = new SkillChecker();
        this.recipe = new Recipes();
        this.player = this.world.player;

        this.mobImg = new Image();
        this.statusImg = new Image();
        this.foodImg = new Image();
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
        let player = this.player;
        let statusYPos = 40;
        let statusXPos = 60;
        let imageHeightWidth = 20;
        let sourceHeightWidth = 32;
        let paddingSpace = 25;

        let buffer = display.buffer;
        buffer.font = '14px Arial';

        let status;
        if (clickType === 1) {
            //Build
            status = 64;
        } else {
            //Gather
            status = 0;
        }

        buffer.fillStyle = 'red';
        buffer.drawImage(this.statusImg, 126, 0, sourceHeightWidth, sourceHeightWidth, player.x, y + paddingSpace, imageHeightWidth, imageHeightWidth);
        buffer.fillText(':' + player.getHealthPoint(), player.x + paddingSpace, y + statusYPos);

        buffer.fillStyle = 'brown';
        buffer.drawImage(this.statusImg, 0, 0, sourceHeightWidth, sourceHeightWidth, player.x + statusXPos, y + paddingSpace, imageHeightWidth, imageHeightWidth);
        buffer.fillText(':' + player.getMiningLevel(), player.x + statusXPos + paddingSpace, y + statusYPos);

        buffer.fillStyle = 'black';
        buffer.drawImage(this.statusImg, 96, 0, sourceHeightWidth, sourceHeightWidth, player.x + statusXPos * 2, y + paddingSpace, imageHeightWidth, imageHeightWidth);
        buffer.fillText(':' + player.getArmour(), player.x + statusXPos * 2 + paddingSpace, y + statusYPos);

        buffer.fillStyle = 'black';
        buffer.drawImage(this.statusImg, 32, 0, sourceHeightWidth, sourceHeightWidth, player.x + statusXPos * 3, y + paddingSpace, imageHeightWidth, imageHeightWidth);
        buffer.fillText(': ' + player.getAttackPower(), player.x + statusXPos * 3 + paddingSpace, y + statusYPos);

        if (player.getStamina()  > 5) {
            buffer.fillStyle = 'black';
        } else {
            buffer.fillStyle = 'red';
        }
        buffer.drawImage(this.statusImg, 158, 0, sourceHeightWidth, sourceHeightWidth, player.x + statusXPos * 4, y + paddingSpace, imageHeightWidth, imageHeightWidth);
        buffer.fillText(': ' + player.getStamina(), player.x + statusXPos * 4 + paddingSpace, y + statusYPos);
        // buffer.fillText('Armour Level: ' + this.player.attack, xPos + statusXPos *2, y + statusYPos);
        buffer.fillStyle = 'red';
        buffer.drawImage(this.statusImg, status, 0, sourceHeightWidth, sourceHeightWidth, player.x + statusXPos * 3 + paddingSpace * 3, y, imageHeightWidth, imageHeightWidth);
        buffer.fillText('Click Type: ', player.x + statusXPos * 3, y + 10);
    };

    /**
     *
     * @param e - Click event param
     * @param canvas - Buffer for Canvas Input
     * @param map Map - Array for the Tiles on Canvas
     * @param player - Player Object
     * @param type - Listener for Click state
     * @param slotNumber - Slot Number Selection for Inventory
     */
    getClick(e, canvas, map, player, type, slotNumber) {
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

            if ((itemIndex) && (player.getStamina() > 0)) {
                let itemArray = map[itemIndex];
                let addedItem = new blockData(itemArray.getMaterial(), itemArray.getState(), itemArray.getXpos(), itemArray.getYpos(), itemArray.getSpritePos());
                let itemMatch = true;
                let itemMatchIndex;

                if (this.inventory.items.length === 0) {
                    this.inventory.items.push(addedItem);
                    // this.inventory.items[0].addAmtOfMaterial();
                }
                if (this.inventory.items.length > 0) {
                    for (let itemCount = 0; itemCount < this.inventory.items.length; itemCount++) {
                        if (addedItem.getMaterial() === this.inventory.items[itemCount].getMaterial()) {
                            itemMatchIndex = itemCount;
                            itemMatch = false;
                            break;
                        }
                        if (itemCount + 1 === this.inventory.items.length) {
                            break;
                        }
                    }
                }

                if (itemMatch) {
                    this.inventory.items.push(addedItem);
                    addedItem.addAmtOfMaterial()

                } else {
                    this.inventory.items[itemMatchIndex].addAmtOfMaterial();
                }

                player.decreaseStamina();
                map[itemIndex].spritePos = 9;
                map[itemIndex].state = 1;
                map[itemIndex].material = 'air';
            }
        }

        //Building Mode
        if (type === 1) {
            let slotNum = slotNumber - 1;
            console.log(slotNum);
            console.log(this.inventory.items[slotNum]);
            for (let i = 0; i < map.length; i++) {
                if ((player.x + tileSize * 2 >= mX) && (mX + tileSize * 2 >= player.x) && (mY + tileSize * 2 >= player.y) && (player.y + tileSize * 3 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state === 1)) {
                        itemIndex = index;
                        break;
                    }
                }
            }
            if ((itemIndex) && (this.inventory.items.length > 0) && player.getStamina() > 0) {
                if (this.inventory.items[slotNum].getItemCount() > 0) {
                    player.decreaseStamina();
                    map[itemIndex].material = this.inventory.items[slotNum].material;
                    map[itemIndex].state = 2;
                    map[itemIndex].spritePos = this.inventory.items[slotNum].spritePos;
                    // if(this.inventory.items[slotNum])
                    this.inventory.items[slotNum].removeMaterial();

                }
                if (this.inventory.items[slotNum].getItemCount() === 0) {
                    this.inventory.items.splice(slotNum, 1);
                }


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
            buffer.drawImage(tile_sheet.image, source_x, source_y, tile_sheet.tile_size, tile_sheet.tile_size, dest_x, 10, 20, 20);

            if (this.inventory.items[index].getItemCount() > 0) {
                buffer.fillText(this.inventory.items[index].getItemCount(), dest_x, 40);
            } else {
                buffer.fillText('', dest_x, 10);
            }

        }
    }

    /**
     *
     * @param player - Player Object
     * @param display - Canvas Context (this.buffer)
     * @param upgrade - Return Value for upgrading selected Items
     */
    upgrades(player, display, upgrade) {
        let buffer = display.buffer;
        let itemInventory = this.inventory.items;
        let recipe = this.recipe;
        let itemUpgrade = recipe.checkUpgradePix(itemInventory);
        let attackUpgrade = recipe.checkWeaponUpgrade(itemInventory);
        let defenseUpgrade = recipe.checkArmourUpgrade(itemInventory);
        buffer.fillStyle = 'black';

        //Pix Power
        if (itemUpgrade > 0) {
            if ((player.getMiningLevel() === 1) && (itemUpgrade === 1)) {
                buffer.fillText('Press Z to Upgrade Pix Power', player.x - 20, player.y - 10);
                if (upgrade === 1) {
                    upgrade = 0;
                    player.levelUpPix();
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory[i].removeAmtOfMaterial(5);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }

                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 10);
                }
            }
            if ((player.getMiningLevel() === 2) && (itemUpgrade === 2)) {
                buffer.fillText('Press Z to Upgrade Pix Power', player.x - 20, player.y - 10);
                if (upgrade === 1) {
                    player.levelUpPix();
                    upgrade = 0;
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory[i].removeAmtOfMaterial(8);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 10);
                }
            }
            if ((player.getMiningLevel() === 3) && (itemUpgrade === 3)) {
                buffer.fillText('Press Z to Upgrade Pix Power', player.x - 20, player.y - 10);
                if (upgrade === 1) {
                    player.levelUpPix();
                    upgrade = 0;
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'copper') {
                            itemInventory[i].removeAmtOfMaterial(5);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                        if (itemInventory[i].material === 'coal') {
                            itemInventory[i].removeAmtOfMaterial(5);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 10);
                }
            }
        }

        //Weapon Upgrade
        if (attackUpgrade !== 0) {
            if ((player.getAttackPower() === 10) && (attackUpgrade === 1)) {
                buffer.fillText('Press X to Upgrade Attack Power', player.x - 20, player.y - 20);
                if (upgrade === 2) {
                    player.levelUpAttack(10);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory[i].removeAmtOfMaterial(8);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 20);
                }
            }

            if ((player.getAttackPower() === 20) && (attackUpgrade === 2)) {
                buffer.fillText('Press X to Upgrade Attack Power', player.x - 20, player.y - 20);
                if (upgrade === 2) {
                    player.levelUpAttack(20);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory[i].removeAmtOfMaterial(10);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 20);
                }
            }

            if ((player.getAttackPower() === 40) && (attackUpgrade === 3)) {
                buffer.fillText('Press X to Upgrade Attack Power', player.x - 20, player.y - 20);
                if (upgrade === 2) {
                    player.levelUpAttack(30);
                    for (let i = 0; i < itemInventory.length; i++) {
                        for (let x = 0; x < 5; x++) {
                            if (itemInventory[x].material === 'copper') {
                                itemInventory[i].removeAmtOfMaterial(5);
                                if (itemInventory[i].getItemCount() === 0) {
                                    itemInventory.splice(i);
                                }
                            }
                            if (itemInventory[x].material === 'coal') {
                                itemInventory[i].removeAmtOfMaterial(5);
                                if (itemInventory[i].getItemCount() === 0) {
                                    itemInventory.splice(i);
                                }
                            }
                        }
                        buffer.fillText('', player.x - 20, player.y - 20);
                    }
                }
            }

        }

        //Armour Upgrade
        if (defenseUpgrade !== 0) {
            if ((player.getArmour() === 5) && (defenseUpgrade === 1)) {
                buffer.fillText('Press C to Upgrade Armour', player.x - 20, player.y - 30);
                if (upgrade === 3) {
                    player.levelUpArmour(10);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory[i].removeAmtOfMaterial(8);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 30);
                }
            }
            if ((player.getArmour() === 15) && (defenseUpgrade === 2)) {
                buffer.fillText('Press C to Upgrade Armour', player.x - 20, player.y - 30);
                if (upgrade === 3) {
                    player.levelUpArmour(10);
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory[i].removeAmtOfMaterial(10);
                            if (itemInventory[i].getItemCount() === 0) {
                                itemInventory.splice(i);
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 30);
                }
            }

            if ((player.getArmour() === 25) && (defenseUpgrade === 3)) {
                buffer.fillText('Press C to Upgrade Armour', player.x - 20, player.y - 30);
                if (upgrade === 3) {
                    player.levelUpArmour(20);
                    for (let i = 0; i < itemInventory.length; i++) {
                        for (let x = 0; x < 5; x++) {
                            if (itemInventory[x].material === 'copper') {
                                itemInventory[i].removeAmtOfMaterial(5);
                                if (itemInventory[i].getItemCount() === 0) {
                                    itemInventory.splice(i);
                                }
                            }
                            if (itemInventory[x].material === 'coal') {
                                itemInventory[i].removeAmtOfMaterial(5);
                                if (itemInventory[i].getItemCount() === 0) {
                                    itemInventory.splice(i);
                                }
                            }
                        }
                    }
                    buffer.fillText('', player.x - 20, player.y - 30);
                }
            }

        }

    }

    /**
     *
     * @param map - May Array to Use For Collision Detection
     * @param display - Buffer for Canvas Input
     * @param mob - Mob Array
     * @param player - Player Object
     */
    updateMob(map, display, mob, player) {
        let tileSize = 30;
        let counterIndex;
        let direction = true;
        // let mobArray = [];
        for (counterIndex = 0; counterIndex < mob.length; counterIndex++) {
            mob[counterIndex].y += this.world.gravity;
            //Left Side
            if ((mob[counterIndex].x > player.x) && (mob[counterIndex].y >= player.y - tileSize)) {
                direction = true;
                mob[counterIndex].x -= 1;
            }

            //Right Side
            if ((mob[counterIndex].x < player.x) && (mob[counterIndex].y >= player.y - tileSize)) {
                direction = false;
                mob[counterIndex].x += 1;
            }

            for (let i = 0; i < map.length; i++) {

                if (mob[counterIndex].x < map[i].xPos + tileSize && mob[counterIndex].x + 25 > map[i].xPos && mob[counterIndex].y < map[i].yPos + tileSize && mob[counterIndex].y + 25 > map[i].yPos) {
                    if (map[i].state === 2) {
                        if (mob[counterIndex].y + 25 >= map[i].yPos + tileSize) {

                            //Right Side
                            if ((mob[counterIndex].y < map[i].yPos + tileSize) && mob[counterIndex].x <= map[i].xPos) {
                                mob[counterIndex].x -= 5;
                                mob[counterIndex].y -= 10;
                                mob[counterIndex].x += 5;
                            }

                            //Left Side
                            if ((mob[counterIndex].y < map[i].yPos + tileSize) && mob[counterIndex].x > map[i].xPos) {

                                mob[counterIndex].x += 5;
                                mob[counterIndex].y -= 10;
                                mob[counterIndex].x -= 5;
                            }

                            if ((mob[counterIndex].y + 25 >= map[i].yPos) && (mob[counterIndex].y < map[i].yPos + tileSize)) {
                                mob[counterIndex].y += 0;
                            }

                            if (mob[counterIndex].y < map[i].yPos + 20) {
                                mob[counterIndex].y -= tileSize * 2;
                            }

                        } else {
                            // if((mob[counterIndex].y < map[i].yPos + tileSize) && (mob[counterIndex].x === map[i].xPos)){
                            //     mob[counterIndex].y += 0;
                            // } else {

                            mob[counterIndex].y = map[i].yPos - 25;
                            // }

                        }

                        if (mob[counterIndex].x <= player.x + tileSize && mob[counterIndex].x + 25 > player.x && mob[counterIndex].y < player.y + tileSize && mob[counterIndex].y + 25 > player.y) {
                            player.getDamage(mob[counterIndex].getMobAttack());
                            if(player.getHealthPoint() <= 0){
                                player.playerAlive = 0;
                            }
                        } else {
                            player.getHurt = false;
                        }
                    }
                }

            }


            // Mob Image Rendering
            if (direction) {
                display.buffer.drawImage(this.mobImg, mob[counterIndex].mobImgPos, 0, 35, 42, mob[counterIndex].x, mob[counterIndex].y, 25, 25);
            } else {
                display.buffer.save();
                display.buffer.translate(mob[counterIndex].x + 33, mob[counterIndex].y);
                display.buffer.scale(-1, 1);
                display.buffer.drawImage(this.mobImg, mob[counterIndex].mobImgPos, 0, 35, 42, 0, 0, 25, 25);
                display.buffer.restore();
            }

        }

    }

    /**
     *
     * @param attack - Listener for Player Attack Input
     * @param mob - Mob Object
     * @param player - Player Object
     */
    attackMob(attack, mob, player) {
        let tileSize = 30;
        let mobArray = mob;
        let mobCount, mobIndex;
        if (attack) {
            for (mobCount = 0; mobCount < mobArray.length; mobCount++) {
                let mob = mobArray[mobCount];
                if (mob.x - tileSize < player.x && mob.x + tileSize > player.x) {
                    if (mob.y - tileSize < player.y && mob.y + tileSize > player.y) {
                        if (mob.state === 3) {
                            mobIndex = mobCount;
                            break;
                        }
                    }
                }

            }
            if (mobIndex >= 0) {
                mobArray[mobIndex].getDamage(player.getAttack());
                if (mobArray[mobIndex].mobHp <= 0) {
                    if (mobArray[mobIndex].mobType === 1) {
                        if (player.maxHealth > player.getHealthPoint()) {
                            player.healHealthPoints(50);
                        }
                    }
                    if ((mobArray[mobIndex].mobType === 2) || (mobArray[mobIndex].mobType === 3)) {
                        if (player.maxStamina > player.getStamina()) {
                            player.healStamina(2);
                        }

                    }
                    player.addMobKill();
                    mobArray.splice(mobIndex, 1);
                }

            }
        }


    }


}