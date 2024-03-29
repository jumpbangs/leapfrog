let splashScreen = (reload = false) => {

    let canvas = document.querySelector('canvas').getContext('2d');
    canvas.canvas.width = window.innerWidth;
    canvas.canvas.height = window.innerHeight;

    let load = (event) => {
        if (event.type === 'click') {
            canvas.canvas.removeEventListener('click', load);
            main();
        }

    };

    let splashImg = new Image();
    let deathSplash = new Image();
    splashImg.src = 'assets/img/splash/splash.png';
    deathSplash.src = 'assets/img/splash/death-splash.png';

    if (reload) {
        canvas.drawImage(deathSplash, 0, 0, canvas.canvas.width, canvas.canvas.height);
        canvas.canvas.addEventListener('click', load);
    }

    window.onload = () => {
        canvas.drawImage(deathSplash, 0, 0, canvas.canvas.width, canvas.canvas.height);
        canvas.drawImage(splashImg, 0, 0, canvas.canvas.width, canvas.canvas.height);
        canvas.canvas.addEventListener('click', load);
    };

};

let main = () => {

    let changed, request, attack, consume,displayMenu;
    let clickType = 0;
    let upgrade = 0;
    let spawnCounter = 0;
    let numberOfMob = [];
    let numberOfFood = [];
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
            let mobX = (game.player.x - 300) * Math.random() * 10;
            // let mobX = 400;
            let mobY = 0;
            let mob = new Mob(mobX, mobY);
            mob.mobDetails((Math.floor(Math.random() * 3) + 1), game.player.getKillScore());
            numberOfMob.push(mob);
        }
    };

    let spawnFood = () => {
        if(numberOfFood.length <= 19){
            let posX = Math.floor(game.player.x * Math.random() * 10);
            // let posX = game.player.x + 100;

            let poxY = 220;
            let food = new Food(posX, poxY);
            if(Math.random() >= .5){
                food.foodDetails(1);
            }
            if(Math.random() <= .5){
                food.foodDetails(2);
            }
            numberOfFood.push(food);
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
        display.displayInstructions(playerX, 30, displayMenu);
        display.updateAnimation(game.world.player, attack);
        display.updateView(playerX);
        game.upgrades(game.world.player, display, upgrade);
        game.updateInventory(playerX, display);
        game.displayStatus(20, display, clickType);

        //Display Mobs
        game.updateMob(game.map, display, numberOfMob, game.world.player);

        game.consumeFood(display, numberOfFood, game.world.player, consume);

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

        if (controller.consume.active) {
            consume = true;
        } else {
            consume = false;
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
        } else {
            upgrade = 0;
        }

        displayMenu = event.code === 'KeyF';

        //Slot Inventory Select
        if (event.key >= 1 && event.key <= 9) {
            slotNumber = event.key;
        }

    };

    // For Gathering and Building
    document.onmousedown = (click) => {
        game.getClick(click, canvas, game.map, game.world.player, clickType, slotNumber);
    };


    const performAnimation = () => {
        request = requestAnimationFrame(performAnimation);

        load();
        render();
        update();
        spawnFood();

        spawnCounter++;
        if (spawnCounter % 50 === 10) {
            spawnMob();
        }

        if (game.world.player.playerAlive === 0) {
            cancelAnimationFrame(request);
            splashScreen(true);
        }

    };

    requestAnimationFrame(performAnimation);


    //Block Sheet
    display.image.src = 'assets/img/world/Spritesheet_1.png';

    //Character Sheet
    display.chara_img.src = 'assets/img/chara/chara_sheet.png';
    game.statusImg.src = 'assets/img/status/status-sheet.png';
    game.mobImg.src = 'assets/img/mob/mob.png';
    game.foodImg.src ='assets/img/food/food-sheet.png';

};

splashScreen();