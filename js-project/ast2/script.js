function Box(parentElement) {
    this.x = 10;
    this.y = 10;
    this.dx = 1;
    this.dy = -1;
    this.width = 20;
    this.height = 20;
    this.element = null;
    this.parentElement = parentElement;
    var that = this;
    this.init = function () {
        var box = document.createElement('div');
        box.style.height = this.height + 'px';
        box.style.width = this.width + 'px';
        box.classList.add('box');
        this.parentElement.appendChild(box);
        this.element = box;
        this.draw();
        return this;
    };
    this.setPostion = function (x, y) {
        this.x = x;
        this.y = y;
    };

    this.draw = function () {
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
    };

    this.move = function (height, width, boxes) {

        if (this.checkCollision(boxes)) {
            this.dx = -this.dx;
            this.dy = -this.dy;
        } else {
            if (((this.x + this.dx) > (width - this.width)) || ((this.x + this.dx) < 0)) {
                this.dx = -this.dx;
            }

            if (((this.y + this.dy) > (height - this.height)) || ((this.y + this.dy) < 0)) {
                this.dy = -this.dy;
            }
        }
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    };

    this.checkCollision = function (boxes) {
        for (var i in boxes) {
            var x = boxes[i].x;
            var x2 = that.x;
            var y = boxes[i].y;
            var y2 = that.y;
            var width = that.width;
            var height = that.height;

            if ((x != x2) && (y != y2)) {
                if ((x < x2 + width) && (x + width > x2) &&
                    (y < y2 + height) && (y + height > y2)) {
                    return true;
                }
            } else {
                return false;
            }
        }
    };

    this.antMaker = function () {
        this.element.style.background = 'transparent';
        this.element.style.backgroundImage = 'url("./ant.jpg")';
        this.element.style.backgroundSize = '100% 100%';
        this.element.style.backgroundRepeat = 'no-repeat';
        this.element.addEventListener('click', function () {
            that.element.style.display = 'none';
            that.killed = true;
        });
    };

}

function getRandomArbitrary(min, max) {
    var randValue = Math.round(Math.random() * 10);
    return Math.ceil(Math.random() * (max - min + randValue) + min);
}

function scoreTable(parentElement) {
    this.numOfAnts = function () {
        var table = document.createElement('div');
        table.classList.add('scoreTable');
        parentElement.appendChild(table);
        this.scoreList = table;
        return this;
    }
}

function Game(parentElement, boxCount) {
    scoreTable.call(this, parentElement);
    var boxes = [];
    var MAX_WIDTH = 500;
    var MAX_HEIGHT = 500;
    this.parentElement = parentElement;
    this.boxCount = boxCount || 15;
    this.counter = [];
    var running = false;
    var that = this;

    this.startGame = function () {
        var startBtn = document.createElement('button');
        startBtn.classList.add('resetBtn');
        that.parentElement.appendChild(startBtn);
        startBtn.innerHTML = 'Start';
        this.numOfAnts();
        startBtn.onclick = function () {
            if (!running) {
                that.game();
                startBtn.innerHTML = 'Restart';
            };
        };
    };

    this.game = function () {
        running = true;
        for (var i = 0; i < this.boxCount; i++) {
            var box = new Box(parentElement).init();
            var genMaxHeight = MAX_HEIGHT - 50;
            var genMaxWidth = MAX_WIDTH - 50;
            box.setPostion(
                getRandomArbitrary(0, genMaxWidth),
                getRandomArbitrary(0, genMaxHeight)
            );
            var checkOverlay = false;
            do {
                checkOverlay = box.checkCollision(box);
                if (checkOverlay) {
                    box.setPostion(
                        getRandomArbitrary(0, genMaxWidth),
                        getRandomArbitrary(0, genMaxHeight)
                    );
                } else {
                    box.draw();
                    boxes.push(box);
                }
            } while (checkOverlay);
        }
        ;
        setInterval(this.moveBoxes.bind(this), 10);
        this.moveBoxes();

    };

    this.moveBoxes = function () {
        for (var i = 0; i < boxes.length; i++) {
            boxes[i].move(MAX_HEIGHT, MAX_WIDTH, boxes);
            boxes[i].checkCollision(boxes);
            boxes[i].antMaker(i , boxes);
            this.boxDestroyedCheck(boxes[i]);
        };
        this.displayScore();
    };

    this.displayScore = function () {

        this.scoreList.innerHTML = '<h3>Number of Ants Alive</h3>' + boxes.length;
        if(boxes.length === 0){
            running = false;
            this.scoreList.innerHTML = '<h3>All Ants are Exterminated</h3><br>Click Restart To play again';
        }
    };

    this.boxDestroyedCheck = function(box) {
        if (box.element.style.display == 'none') {
            var indexofBox = boxes.indexOf(box);
            boxes.splice(indexofBox, 1);
            that.counter.push(indexofBox);
        }
    }

};

var parentElement = document.getElementById('app');

new Game(parentElement).startGame();
