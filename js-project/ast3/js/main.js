var LASTRENDER = 0;
var OLDTIMESTAMP;
var COUNTER = 0;
var SCORE = 0;
var PAUSE = true;

function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Game(parentElement) {
    this.player = null;
    this.otherCar = null;
    this.otherCarsArray = [];
    this.parentElement = parentElement;

    var that = this;
    var road = new Road(parentElement);

    road.create();
    this.runGame = function () {

        function loop(TIMESTAMP) {
            // FPS Calculator
            // var progress = (TIMESTAMP - LASTRENDER)/1000;
            // var fps = Math.round(1 / progress);
            // // console.log(fps);

            if (PAUSE) {
                that.renderRoad();
                COUNTER++;
            }

            LASTRENDER = TIMESTAMP;
            window.requestAnimationFrame(loop);
        }

        window.requestAnimationFrame(loop);

    };

    this.generatePlayer = function () {
        this.player = new Player(road.element);
        this.player.init();
    };

    this.generateObstacle = function () {
        this.otherCar = new obstacle(road.element);
        this.otherCarsArray.push(this.otherCar);
        this.otherCar.init();
    };

    this.renderRoad = function () {
        road.update(5);
        document.onkeydown = function (event) {
            var keyPressed = event.code;
            if ((keyPressed === 'ArrowRight' )|| (keyPressed === 'KeyD')) {
                that.player.movePlayer(keyPressed);
            }
            if ((keyPressed === 'ArrowLeft' ) || (keyPressed === 'KeyA')) {
                that.player.movePlayer(keyPressed);
            }
            if (keyPressed === 'Space') {
                that.player.movePlayer(keyPressed);
            }
        };

        for (var x = 0; x < that.otherCarsArray.length; x++) {
            var otherCar = that.otherCarsArray[x];
            otherCar.moveAway();
            if (!that.checkCollision(that.player.carPosition, that.player.y, x) &&
                (otherCar.y >= 580)) {
                console.log(SCORE += 100);
            }
        }

        if ((that.otherCarsArray.length > 0) && (that.otherCarsArray[0].y >= 580)) {
            that.otherCarsArray[0].removeCar();
            that.otherCarsArray.splice(0, 1);
        }

        if (COUNTER % 30 === 0) {
            var genTrue = getRandom(0, 5);
            if (genTrue === 1) {
                that.generateObstacle();
            }
        }

    };

    this.checkCollision = function (playerX, playerY, obstacleIndex) {
        var obstacleX = that.otherCarsArray[obstacleIndex].x;
        var obstacleY = that.otherCarsArray[obstacleIndex].y;


        if ((playerX === obstacleX) && ((playerY < obstacleY + 120) && (playerY + 120 > obstacleY))) {
            resetGame();
        } else {
            return false;
        }

    };


    this.runGame();
    this.generatePlayer();
    this.generateObstacle();

    function resetGame() {
        // delete that.generateRoad();
        setTimeout(function () {
            PAUSE = true;
            window.location.reload();
        }, 100);

        // startGame();

    }

}

var parentElement = document.getElementById('carGame');

function startGame() {
    var startHeading = document.createElement('h1');
    var startBtn = document.createElement('button');

    startHeading.style.textAlign = 'center';
    startBtn.style.display = 'block';
    startBtn.style.margin = '0px auto';

    startHeading.appendChild(document.createTextNode('Use A/D or Left/Right arrows to Navigate'));
    startBtn.appendChild(document.createTextNode('PLAY'));

    parentElement.appendChild(startHeading);
    parentElement.appendChild(startBtn);

    startBtn.onclick = function () {
        parentElement.removeChild(startBtn);
        parentElement.removeChild(startHeading);
        new Game(parentElement);
    }

}

startGame();
