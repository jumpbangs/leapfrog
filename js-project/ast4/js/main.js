let highScore = 0;
let prevScore = 0;
class Game {

    constructor(parentId, flyKey) {
        this.mainParent = document.getElementById(parentId);
        this.bird = new Bird(this.mainParent);
        this.background = new backGround(this.mainParent);
        this.gameId = parentId;
        this.counter = 0;
        this.obstacle = '';
        this.obstacleCounter = [];
        this.checkBird = false;
        this.flykey = flyKey;
        this.startBtn = undefined;
        this.restartBtn = undefined;
        this.endHeading = undefined;
        this.scoreHeading = undefined;
        this.running = undefined;

        this.startGame();
    };

    createGame() {
        this.scoreHeading = document.createElement('h2');
        this.scoreHeading.style.position = "absolute";
        this.scoreHeading.style.zIndex = '1';
        this.mainParent.appendChild(this.scoreHeading);

        this.mainParent.classList.add('backgroundImage');

        // let gameTitle = document.createElement('div');
        // gameTitle.classList.add('gameTitle');
        // this.mainParent.appendChild(gameTitle);

        let startHeading = document.createElement('h1');
        this.startBtn = document.createElement('button');

        this.mainParent.appendChild(startHeading);
        this.mainParent.appendChild(this.startBtn);

        startHeading.classList.add('startTitle');
        this.startBtn.classList.add('startBtn');

        startHeading.innerHTML = 'Press Play to Start';
        this.startBtn.innerHTML = 'Play';

        this.startBtn.onclick = (event) => {
            console.log(this);
            this.mainParent.removeChild(startHeading);
            this.mainParent.removeChild(this.startBtn);
            this.mainParent.classList.remove('backgroundImage');
            this.runGame();
        }
    };

    runGame() {
        console.log(this.checkBird);
        this.background.createBackground();
        this.bird.createBird();
        // this.obstacle = new Obstacle(this.mainParent);
        // this.obstacle.createObstacle();
        this.running = setInterval(() => {
            this.scoreBoard();
            this.background.updateBackground();
            console.log(this.checkBird);
            if (this.checkBird) {
                document.onkeydown = null;
                this.resetGame();
            } else {
                this.checkBird = this.bird.updateBirdPos();
            }

            document.onkeydown = (event) => {
                let birdDirection = 0;
                var keyPress = event.code;
                if (keyPress === this.flykey) {
                    birdDirection = 1;
                    this.bird.flying(birdDirection);
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
        console.log(this.checkBird);
        document.onkeydown = null;
        clearInterval(this.running);
        this.endHeading = document.createElement('h1');
        this.restartBtn = document.createElement('button');

        this.endHeading.style.lineHeight = '0';
        this.endHeading.style.textAlign = 'center';
        this.endHeading.style.position = "absolute";
        this.endHeading.style.left = '45px';
        this.endHeading.style.top = '110px';

        this.restartBtn.style.display = 'block';
        this.restartBtn.style.position = "absolute";
        this.restartBtn.style.margin = '0px auto';
        this.restartBtn.style.left = '88px';
        this.restartBtn.style.top = '155px';


        this.endHeading.appendChild(document.createTextNode('Game Over'));
        this.restartBtn.appendChild(document.createTextNode('Restart Game'));

        this.mainParent.appendChild(this.endHeading);
        this.mainParent.appendChild(this.restartBtn);
        this.restartBtn.onclick = (event) => {
            this.endHeading.remove();
            this.restartBtn.remove();
            var mainClass = document.getElementById(this.gameId);
            while(mainClass.hasChildNodes()){
                mainClass.removeChild(mainClass.firstChild);
            }

            this.counter = 0;
            this.obstacle = '';
            this.obstacleCounter = [];
            this.startBtn = undefined;
            this.restartBtn = undefined;
            this.endHeading = undefined;
            this.scoreHeading = undefined;
            this.running = undefined;
            this.checkBird = false;
            this.bird = new Bird(this.mainParent);
            this.startGame();
        }

    }

    collisionDetection() {
        this.obstacleCounter.forEach((value) => {
                if ((this.bird.x >= value.x + 50)) {
                    if (this.bird.y <= value.topHeight || this.bird.y  >= 512 - value.bottomHeight) {
                        clearInterval(this.running);
                        this.checkBird = false;
                        this.resetGame();
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

    startGame(){
        this.createGame();
    }

}


let newGame = new Game('game1', 'Space');
let newGame1 = new Game('game2', 'ArrowUp');

