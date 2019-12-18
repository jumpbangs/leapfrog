var run = (() => {

    let changed;
    let clickType = 0;
    let attack;
    let upgrade = 0;
    let spawnCounter  = 0;
    let numberOfMob = [];
    let slotNumber = 1;

    // Changes State to Build or Gather
    let clickSwitcher = () => {
        changed = 0;
        if (clickType === 0 && changed === 0) {
            clickType = 1;
            changed = 1;
        }

        if (clickType === 1 && changed === 0) {
            clickType = 0;
            changed = 1;
        }
    };

    //Spawn Function
    let spawnMob = () => {
        if (numberOfMob.length < 10) {
            let mobX = (game.player.x - 300) * Math.random()*10;
            // let mobX = 400;
            let mobY = 0;
            let mob = new Mob(mobX, mobY);
            mob.mobDetails((Math.floor(Math.random() * 3) + 1 ), game.player.getKillScore() );
            numberOfMob.push(mob);
        }
    };

    // Gets Keyboard Input
    let keyDownUp = (event) => {
        controller.keyDownUp(event.type, event.code);
    };

    // Load the Canvas
    let load = (event) => {
        display.loadCanvas(game.world.width, game.world.height);
        display.render();
    };

    // Renders Canvas Items
    let render = () => {
        let playerX = game.world.player.x;
        // display.drawGrid();

        display.drawMap(game.map, 40);
        display.drawInventory(playerX, 10, 170, 30, 'rgba(255, 255, 255, 0.5)');
        display.displayInstructions(playerX, 30);
        display.updateAnimation(game.world.player, attack);
        display.updateView(playerX);
        game.upgrades(game.world.player, display, upgrade);
        game.updateInventory(playerX, display);
        game.displayStatus(20, display, clickType);

        //Display Mobs
        game.updateMob(game.map, display,numberOfMob, game.world.player);
        display.render();
    };

    // Checks for User Input
    let update = () => {
        if (controller.left.active) {
            game.world.player.moveLeft();
        }
        if (controller.right.active) {
            game.world.player.moveRight();
        }
        if (controller.up.active) {
            game.world.player.jump();
            controller.up.active = false;
        }
        if (controller.attack.active) {
            attack = true;
            game.attackMob(attack, numberOfMob, game.world.player);
        } else {
            attack = false;
        }
        game.update();

    };


    let controller = new Controller();
    let display = new Display(document.querySelector('canvas'));
    let game = new Game();


    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener('keydown', keyDownUp);
    window.addEventListener('keyup', keyDownUp);


    let canvas = document.querySelector('canvas');
    document.onkeyup = (event) => {
        //Gather || Build Mode
        if (event.code === 'KeyE') {
            clickSwitcher();
        }

        //Upgrade Pix Power
        if (event.code === 'KeyZ') {
            upgrade = 1;
        }

        //Upgrade Weapons
        else if (event.code === 'KeyX') {
            upgrade = 2;
        }

        //Upgrade Armour
        else if (event.code === 'KeyC') {
            upgrade = 3;
        }
        else {
            upgrade = 0;
        }

        //Slot Inventory Select
        if(event.key >= 1 && event.key <= 9){
            slotNumber = event.key;
        }

    };

    // For Gathering and Building
    document.onmousedown = (click) => {
        game.getClick(click, canvas, game.map, game.world.player, clickType, slotNumber);
    };


    setInterval(() => {
        load();
        render();
        update();

        spawnCounter++;
        if(spawnCounter % 50 === 10){
            spawnMob();
        }
    }, 1000 / 25);



    //Block Sheet
    display.image.src = 'assets/img/world/Spritesheet_1.png';
    //Character Sheet
    // display.chara_img.src = 'assets/img/chara/charSprite_sheet.png';
    display.chara_img.src = 'assets/img/chara/chara_sheet.png';
    game.statusImg.src ='assets/img/status/status-sheet.png';
    game.mobImg.src = 'assets/img/mob/mob.png';

})();