var run = (() =>{

    // Gets Keyboard Input
    var keyDownUp =  (event) => {
        controller.keyDownUp(event.type, event.code);
    };


    var resize =  (event) => {
        display.resize(document.documentElement.clientWidth - 32, document.documentElement.clientHeight - 32, game.world.height / game.world.width);
        display.render();
    };

    var render =  () => {
        display.fill(game.world.background_color);// Clear background to game's background color.
        display.drawMap(game.map, game.columns );
        display.drawPlayer(game.world.player, game.world.player.color1, game.world.player.color2);
        display.render();
    };

    var update =  () => {

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
    var engine = new Engine(1000 / 30, render, update);

    display.buffer.canvas.height = game.world.height;
    display.buffer.canvas.width = game.world.width;

    window.addEventListener("keydown", keyDownUp);
    window.addEventListener("keyup", keyDownUp);
    window.addEventListener("resize", resize);


    // display.tileSheet.image.addEventListener('load', (event) => {

        resize();
        engine.start();

    // }, {once :true})

    display.image.src = 'assets/img/world/dirt.png';



})();