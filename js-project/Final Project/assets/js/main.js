var run = (() => {

    let changed;
    let clickType = 0;
    let attack;
    let spawnCounter  = 0;
    let numberOfMob = [];

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

    let spawnMob = () => {
        if (numberOfMob.length <= 0) {
            mob.x = 400;
            mob.y = 0;
            mob.mobHp = 1;
            numberOfMob.push(mob);
        }
    };

    // Gets Keyboard Input
    let keyDownUp = (event) => {
        controller.keyDownUp(event.type, event.code);
    };

    let load = (event) => {
        display.loadCanvas(game.world.width, game.world.height);
        display.render();
    };

    let render = () => {
        let playerX = game.world.player.x;
        // display.drawGrid();

        display.drawMap(game.map, 40);
        display.drawInventory(playerX, 10, 350, 20, 'rgba(255, 255, 255, 0.5)');
        display.updateAnimation(game.world.player, attack);
        display.updateView(playerX);
        game.upgrades(game.world.player);
        game.updateInventory(playerX, display);
        game.displayStatus(20, display, clickType);

        //Display MObs
        game.updateMob(game.map, display,numberOfMob);
        display.render();
    };

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
            game.attackMob(attack, numberOfMob);
        } else {
            attack = false;
        }
        game.update();

    };


    let controller = new Controller();
    let display = new Display(document.querySelector("canvas"));
    let game = new Game();
    let mob = new Mob();


    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", load);


    let canvas = document.querySelector("canvas");
    document.onkeyup = (event) => {
        if (event.code === 'KeyR') {
            clickSwitcher();
        };
    };


    document.onmousedown = (click) => {
        game.getClick(click, canvas, game.map, game.world.player, clickType);
    };


    setInterval(() => {
        load();
        render();
        update();

        spawnCounter++;
        if(spawnCounter % 30 === 10){
            spawnMob();
        }
    }, 1000 / 25);


    //Block Sheet
    display.image.src = 'assets/img/world/Spritesheet_1.png';
    //Character Sheet
    // display.chara_img.src = 'assets/img/chara/charSprite_sheet.png';
    display.chara_img.src = 'assets/img/chara/chara_sheet.png';

})();