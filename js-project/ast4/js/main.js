let highScore = 0;
let prevScore = 0;
class Game {

    constructor(parentId, flyKey) {
        this.running;
        this.checkBird;
        this.mainParent = document.getElementById(parentId);
        this.counter = 0;
        this.obstacle = '';
        this.scoreHeading;
        this.obstacleCounter = [];
        this.bird = new Bird(this.mainParent);
        this.background = new backGround(this.mainParent);
        this.flykey = flyKey;
    };

    createGame() {
        this.scoreHeading = document.createElement('h2');
        this.scoreHeading.style.position = "absolute";
        this.mainParent.appendChild(this.scoreHeading);

        this.mainParent.classList.add('backgroundImage');
        let startHeading = document.createElement('h1');
        let startButton = document.createElement('button');

        this.mainParent.appendChild(startHeading);
        this.mainParent.appendChild(startButton);

        startHeading.classList.add('startTitle');
        startButton.classList.add('startBtn');

        startHeading.innerHTML = 'Press Play to Start';
        startButton.innerHTML = 'Play';

        startButton.onclick = (event) => {
            this.mainParent.removeChild(startHeading);
            this.mainParent.removeChild(startButton);
            this.mainParent.classList.remove('backgroundImage');
            this.runGame();
        }
    };

    runGame() {

        this.background.createBackground();
        this.bird.createBird();

        // this.obstacle = new Obstacle(this.mainParent);
        // this.obstacle.createObstacle();
        this.running = setInterval(() => {
            this.scoreBoard();
            this.background.updateBackground();
            this.checkBird = this.bird.updateBirdPos();

            if (this.checkBird) {
                document.onkeydown = null;
                this.resetGame();
            }
            document.onkeydown = (event) => {
                let birdDirection = 0;
                let keyNumber = event.code;
                if (keyNumber === this.flykey) {
                    birdDirection = 1;
                    this.bird.flying(birdDirection);
                } else {
                    this.bird.style.top ='100px';
                }
            }

            this.counter++;
            if (this.counter % 50 === 0) {
                this.obstacle = new Obstacle(this.mainParent);
                this.obstacleCounter.push(this.obstacle);
                this.obstacle.createObstacle();
            }

            for (var x = 0; x < this.obstacleCounter.length; x++) {
                this.obstacleCounter[x].updateObstacle();
            }

            if (this.obstacleCounter.length > 0) {
                if (this.obstacleCounter[0].x <= 0) {
                    this.obstacleCounter[0].removeObstacle();
                    this.obstacleCounter.splice(this.obstacleCounter[0], 1);
                    highScore++;
                } else {
                    this.collisionDetection();
                }
            }


        }, 50);
    }

    resetGame() {
        document.onkeydown = null;
        clearInterval(this.running);
        let endHeading = document.createElement('h1');
        let restartButton = document.createElement('button');

        endHeading.style.lineHeight = '0';
        endHeading.style.textAlign = 'center';
        endHeading.style.position = "absolute";
        endHeading.style.left = '45px';
        endHeading.style.top = '110px';

        restartButton.style.display = 'block';
        restartButton.style.position = "absolute";
        restartButton.style.margin = '0px auto';
        restartButton.style.left = '88px';
        restartButton.style.top = '155px';


        endHeading.appendChild(document.createTextNode('Game Over'));
        restartButton.appendChild(document.createTextNode('Restart Game'));

        this.mainParent.appendChild(endHeading);
        this.mainParent.appendChild(restartButton);
        restartButton.onclick = (event) => {
            while (this.mainParent.hasChildNodes()) {
                this.mainParent.removeChild(this.mainParent.lastChild);
            }

            start(); //calling function outside the object
        }
    }

    collisionDetection() {
        this.obstacleCounter.forEach((value) => {
                if ((this.bird.x >= value.x + 50)) {
                    if (this.bird.y <= value.topHeight || this.bird.y  >= 512 - value.bottomHeight) {
                        clearInterval(this.running);
                        this.resetGame();
                        return false;
                    }
                }


            }
        )
    }


    scoreBoard() {
        if(highScore > prevScore){
            prevScore = highScore;
        }
        this.scoreHeading.innerHTML = 'Score: ' + prevScore;

    }

}

let start = () => {
    let newGame = new Game('game1', 'Space');
    // let newGame1 = new Game('game2', 'ArrowUp');
    newGame.createGame();
    // newGame1.createGame();

}

start();