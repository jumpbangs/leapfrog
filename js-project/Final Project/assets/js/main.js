var run = (() => {


    // Gets Keyboard Input
    var keyDownUp = (event) => {
        controller.keyDownUp(event.type, event.code);
    };


    var resize = (event) => {
        // display.resize(document.documentElement.clientWidth, document.documentElement.clientHeight, game.world.height / game.world.width);
        display.loadCanvas(game.world.width);
        display.render();
    };

    var render = () => {
        let playerX = game.world.player.x;

        display.drawGrid();
        // display.fill(game.world.background_color);// Clear background to game's background color.
        display.drawMap(game.map, 40);
        // display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
        display.drawRectangle(playerX, 8, 128, 32, 'rgba(255, 255, 255, 0.5)');
        display.updateAnimation(game.world.player);
        display.updateInventory(playerX ,game.world.width);
        display.updateView(playerX);
        display.render();
    };


    var update = () => {

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


    var controller = new Controller();
    var display = new Display(document.querySelector("canvas"));
    var game = new Game();
    // var engine = new Engine(1000 / 25, render, update);

    // console.log("May Array", game.map);
    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);


    var canvas = document.querySelector("canvas");
    document.onmousedown = (click) => {
        display.getClick(click, canvas, game.map, game.world.player);
    };


    setInterval(() => {
        resize();
        render();
        update();
    }, 1000 / 25);

    display.image.src = 'assets/img/world/Spritesheet.png';
    display.chara_img.src = 'assets/img/chara/chara_sheet.png'

})();