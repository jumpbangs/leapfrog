const Controller = function () {

    this.left = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up = new Controller.ButtonInput();
    this.keyDownUp = (type, key_code) => {

        var down = (type === "keydown");
        var keyPressed = key_code;

        if ((keyPressed === 'ArrowRight' )|| (keyPressed === 'KeyD')) {
            this.right.getInput(down);
        }
        if ((keyPressed === 'ArrowLeft' ) || (keyPressed === 'KeyA')) {
            this.left.getInput(down);
        }
        if ((keyPressed === 'KeyW') || (keyPressed === 'ArrowUp')) {
            this.up.getInput(down);
        }
    };

};

Controller.prototype = {

    constructor: Controller

};

Controller.ButtonInput = function () {

    this.active = this.down = false;

};

Controller.ButtonInput.prototype = {

    constructor: Controller.ButtonInput,

    getInput: function (down) {

        if (this.down !== down) this.active = down;
        this.down = down;

    }

};

