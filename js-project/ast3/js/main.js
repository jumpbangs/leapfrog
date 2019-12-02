function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Game(parentElement) {
    this.gameTime = 50;
    this.running = null;
    this.player = null;
    this.otherCar = null;
    this.scoreboard = null;
    this.bullet = null;
    this.otherCarsArray = [];
    this.scoreCounter = [];
    this.levelIncrease = 10;
    this.parentElement = parentElement;

    var that = this;
    var road = new Road(parentElement);

    road.create();

    this.init = function () {
        that.scoreboard = new scoreboard(road.element);
        that.scoreboard.init();
        runGame();
    }

    function runGame() {
        that.generatePlayer();
        that.generateObstacle();
        that.generateBullet();
        // that.displayScore();
        that.running = setInterval(that.renderRoad, that.gameTime);
    }

    this.generatePlayer = function () {
        this.player = new Player(road.element);
        this.player.init();
    };

    this.generateObstacle = function () {
        this.otherCar = new obstacle(road.element);
        this.otherCarsArray.push(this.otherCar);
        this.otherCar.init();
    };

    this.generateBullet = function () {
        this.bullet = new Bullet(road.element);
    };

    this.renderRoad = function () {
        console.log(that.levelIncrease);
        road.update(that.levelIncrease);

        document.onkeydown = function (event) {
            var keyPressed = event.code;
            if ((keyPressed === 'ArrowRight') || (keyPressed === 'KeyD')) {
                that.player.movePlayer(keyPressed);
            }
            if ((keyPressed === 'ArrowLeft') || (keyPressed === 'KeyA')) {
                that.player.movePlayer(keyPressed);
            }
            if (keyPressed === 'Space') {
                // that.player.movePlayer(keyPressed);
                if (that.bullet.bulletCounter < 1) {
                    that.bullet.init(that.player.carPosition, that.player.y);
                }
            }
        };

        for (var x = 0; x < that.otherCarsArray.length; x++) {
            var otherCar = that.otherCarsArray[x];
            var speed = 10;
            otherCar.moveAway(speed + that.levelIncrease);

            //Checks for Collision
            if (!checkCollision(that.player.carPosition, that.player.y, x) &&
                (otherCar.y >= 580)) {
                for (var x in that.otherCarsArray) {
                    that.levelIncrease = that.levelIncrease + 0.5;
                    that.scoreboard.updateScore();
                }
            }
        }

        if ((that.otherCarsArray.length > 0) && (that.otherCarsArray[0].y >= 580)) {
            that.otherCarsArray[0].removeCar();
            that.scoreCounter.push(that.otherCarsArray[0]);
            that.otherCarsArray.splice(0, 1);
        }

        var genTrue = getRandom(0, 10);
        if (genTrue === 1) {
            if (that.otherCarsArray.length < 2) {
                that.generateObstacle();
            }
        }

        if (that.bullet.bulletCounter === 1) {
            var bulletPos = that.player.y + 55;
            that.bullet.bulletMove();
            checkShotDown(that.player.carPosition, bulletPos,that.otherCarsArray, that.levelIncrease);
        }
    };

    function checkCollision(playerX, playerY, obstacleIndex) {
        var obstacleX = that.otherCarsArray[obstacleIndex].x;
        var obstacleY = that.otherCarsArray[obstacleIndex].y;

        if ((playerX === obstacleX) && ((playerY < obstacleY + 120) && (playerY + 120 > obstacleY))) {
            clearInterval(that.running);
            resetGame();
        } else {
            return false;
        }

    }

    function checkShotDown(bulletPoxX, bulletPoxY, obstacleArray, speedlevel) {
        var otherSpeed = 30 + speedlevel;
        for(var x = 0; x < obstacleArray.length; x++){
            if((bulletPoxX === obstacleArray[x].x) && (bulletPoxY + otherSpeed)>= obstacleArray[x].y){
                obstacleArray[x].removeCar();
                that.bullet.bulletRemove();
                that.bullet.bulletCounter = 0;
                that.otherCarsArray.splice(obstacleArray.indexOf(obstacleArray[x]), 1);
            }
        }
    }

    function resetGame() {
        // delete that.generateRoad();
        var reset = setTimeout(function () {
            console.log('Reset');
            window.location.reload();
            clearTimeout(reset);
        }, 1500);

    }

    this.update = function (val) {
        that.scoreboard.updateScore(val);
    }

    this.init();

}

function startGame() {
    var parentElement = document.getElementById('carGame');
    var startDiv = document.createElement('div');
    var startHeading = document.createElement('h1');
    var startBtn = document.createElement('button');

    startHeading.classList.add('startHeading');
    startBtn.classList.add('startBtn');

    startHeading.appendChild(document.createTextNode('Use A/D or Left/Right arrows to Navigate'));
    startBtn.appendChild(document.createTextNode('PLAY'));

    parentElement.appendChild(startDiv);

    startDiv.appendChild(startHeading);
    startDiv.appendChild(startBtn);

    startBtn.onclick = function () {
        parentElement.removeChild(startDiv);
        new Game(parentElement);
    };

    // document.onkeydown = function (event) {
    //     var keyPressed = event.code;
    //     if (keyPressed === 'Space') {
    //         parentElement.removeChild(startDiv);
    //         new Game(parentElement);
    //     }
    // }


}

startGame();
