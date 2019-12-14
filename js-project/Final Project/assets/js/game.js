class Game {
    constructor(object) {
        this.world = new World();
        this.update();
        this.map = this.world.generateMap();

        this.inventory = new Inventory();
        this.skillChecker = new SkillChecker();
        this.recipe = new Recipes();
        this.player = this.world.player;

    }

    update() {
        this.world.update(this.map);
    };

    displayStatus = (y, display) => {
        let xPos = this.player.x;
        let miningLevel = this.player.miningPower;
        let buffer = display.buffer;
        buffer.fillStyle = 'black';
        buffer.fillText("Pix power: " + miningLevel, xPos, y);
    };

    getClick(e, canvas, map, player, type) {
        let itemIndex;
        let mX;
        mX = e.offsetX + (camView.x);
        let mY = e.offsetY;
        let col = canvas.width / 25;
        let index = (Math.floor(mX / 25)) + col * Math.floor(mY / 25);
        if (type === 0) {
            for (let i = 0; i < map.length; i++) {
                if ((player.x + 50 >= mX) && (mX + 50 >= player.x) && (mY + 50 >= player.y) && (player.y + 75 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state !== 1)) {
                        if (this.skillChecker.checkSkillMatch(player.getMiningLevel(), map[index].material)) {
                            itemIndex = index;
                            break;
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

        if (type === 1) {
            for (let i = 0; i < map.length; i++) {
                if ((player.x + 50 >= mX) && (mX + 50 >= player.x) && (mY + 50 >= player.y) && (player.y + 75 >= mY)) {
                    if ((map[index].material !== 'bedrock') && (map[index].state === 1)) {
                        itemIndex = index;
                        break;
                    }
                }
            }
            if (itemIndex) {
                map[itemIndex].material = this.inventory.items[0].material;
                map[itemIndex].state = 2;
                map[itemIndex].spritePos = this.inventory.items[0].spritePos;
                this.inventory.items.splice(0, 1);
            }

        }

    }

    updateInventory(playerX, display) {
        let tile_sheet = display.tile_sheet;
        let buffer = display.buffer;

        for (let index = 0; index < this.inventory.items.length; index++) {
            let item = this.inventory.items[index];
            let dest_x = playerX + (index * 25);
            let value = item.spritePos - 1;
            let source_x = (value % tile_sheet.columns) * tile_sheet.tile_size;
            let source_y = Math.floor(value / tile_sheet.columns) * tile_sheet.tile_size;
            buffer.drawImage(tile_sheet.image, source_x, source_y, tile_sheet.tile_size, tile_sheet.tile_size, dest_x, 10, 25, 25);
        }
    }

    upgradePixPower(player) {
        let itemInventory = this.inventory.items;
        let recipe = this.recipe;
        let itemUpgrade = recipe.checkUpgrade(itemInventory)
        let upgradeBtn = document.getElementById('pixBtn');
        let removedIndex = [];
        let removeCounter = 0;

        if (itemUpgrade > 0) {
            if ((player.getMiningLevel() === 1) && (itemUpgrade === 1)) {
                upgradeBtn.style.display = 'block';
                upgradeBtn.style.backgroundColor = 'rgb(199, 158, 102)';
                upgradeBtn.onclick = () => {
                    player.levelUpPix();
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'wood') {
                            itemInventory.splice(i);
                        }
                    }
                }
            }
            if ((player.getMiningLevel() === 2) && (itemUpgrade === 2)) {
                upgradeBtn.style.display = 'block';
                upgradeBtn.style.backgroundColor = 'rgb(120, 120, 120)';
                upgradeBtn.onclick = () => {
                    player.levelUpPix();
                    for (let i = 0; i < itemInventory.length; i++) {
                        if (itemInventory[i].material === 'stone') {
                            itemInventory.splice(i, 1);
                        }
                    }
                }
            }

        } else {
            upgradeBtn.style.display = 'none';
        }

    }
}