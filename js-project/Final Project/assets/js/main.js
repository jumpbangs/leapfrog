var run = (() => {

    let changed;
    let clickType = 0;

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
        display.drawInventory(playerX , 10, 250, 25, 'rgba(255, 255, 255, 0.5)');
        display.updateAnimation(game.world.player);
        display.updateView(playerX);

        game.upgradePixPower(game.world.player);
        game.updateInventory(playerX ,display);
        game.displayStatus(50, display, clickType);

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
        game.update();

    };


    let controller = new Controller();
    let display = new Display(document.querySelector("canvas"));
    let game = new Game();
    // var engine = new Engine(1000 / 25, render, update);

    // console.log("May Array", game.map);
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", load);


    let canvas = document.querySelector("canvas");
    document.onkeyup = (event)=> {
      if(event.code === 'KeyR'){
          clickerswitch();
      };
    };


    document.onmousedown = (click) => {
        game.getClick(click, canvas, game.map, game.world.player, clickType);
    };


    setInterval(() => {
        load();
        render();
        update();
    }, 1000 / 25);

    function clickerswitch() {
        changed = 0;
        if (clickType === 0 && changed === 0) {
            clickType = 1;
            changed = 1;
        }

        if (clickType === 1 && changed === 0) {
            clickType = 0;
            changed = 1;
        }
    }
    display.image.src = 'assets/img/world/Spritesheet.png';
    display.chara_img.src = 'assets/img/chara/chara_sheet.png'

})();