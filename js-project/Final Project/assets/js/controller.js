// class Controller {
//
//     constructor(type, key_code) {
//         this.active = this.down = false;
//         this.type = type;
//         this.keyCode = key_code;
//         this.left = (down) => {
//             if (this.down !== down) {
//                 this.active = down;
//                 this.down = down;
//             }
//         };
//
//         this.up = (down) => {
//             if (this.down !== down) {
//                 this.active = down;
//                 this.down = down;
//             }
//         };
//
//         this.right = (down) => {
//             if (this.down !== down) {
//                 this.active = down;
//                 this.down = down;
//             }
//         };
//
//         this.keyDownUp(this.type, this.keyCode);
//
//     }
//
//     keyDownUp = (type, key_code) => {
//         var down = (type === "keydown");
//         switch (key_code) {
//             case 37:
//                 this.left(down);
//                 break;
//             case 38:
//                 this.up(down);
//                 break;
//             case 39:
//                 this.right(down);
//
//         }
//     };
//
//
// }



const Controller = function() {

    this.left  = new Controller.ButtonInput();
    this.right = new Controller.ButtonInput();
    this.up    = new Controller.ButtonInput();

    this.keyDownUp = function(type, key_code) {

        var down = (type === "keydown");

        switch(key_code) {

            case 'ArrowLeft': this.left.getInput(down);
            break;
            case 'ArrowUp': this.up.getInput(down);
            break;
            case 'ArrowRight': this.right.getInput(down);

        }

    };

};

Controller.prototype = {

    constructor : Controller

};

Controller.ButtonInput = function() {

    this.active = this.down = false;

};

Controller.ButtonInput.prototype = {

    constructor : Controller.ButtonInput,

    getInput : function(down) {

        if (this.down != down) this.active = down;
        this.down = down;

    }

};










