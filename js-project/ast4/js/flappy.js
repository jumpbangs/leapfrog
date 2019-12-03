//Canvas
var cvs = document.getElementById('canvas');
var ctx = cvs.getContext('2d');

//


//Load Images
var bird = new Image();
var backGround = new Image();
var foreGround = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();


bird.src='img/yellowbird-midflap.png';
bird.src='img/yellowbird-midflap.png';
backGround.src='img/bg.png';
foreGround.src='img/fg.png';
pipeNorth.src='img/pipeNorth.png';
pipeSouth.src='img/pipeSouth.png';


var GAP = 85;
var PIPECONST = pipeNorth.height + GAP;

var birdXpos = 10;
var birdYpos = 150;
var gravity = 1.5;
var score = 0;

var fly = new Audio();
var point = new Audio();
fly.src = 'audio/fly.mp3';
point.src = 'audio/score.mp3';


// Key Down

document.addEventListener("keydown", moveUp);

function moveUp(){
    birdYpos -= 25;
    ctx.drawImage(img,posX,posY);
    // fly.play();
}

var pipe = [];
pipe[0] ={
    x:cvs.width,
    y:0
}


function draw() {
    ctx.drawImage(backGround,0,0);

    for(var i =0; i < pipe.length; i++) {
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, pipe[i].y + PIPECONST);
        pipe[i].x--;

        if(pipe[i].x === 125){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
            });
        }

        if(birdXpos + bird.width >= pipe[i].x && birdXpos <= pipe[i].x + pipeNorth.width &&
            ((birdYpos <= pipe[i].y + pipeNorth.height) ||
            (birdYpos + bird.height) >=(pipe[i].y+PIPECONST) ||
            (birdYpos + bird.height >= cvs.height - foreGround.height))
        )
        {
            window.location.reload();
        }

        if(pipe[i].x === 5){
            score++;
            // point.play();
        }
    }
    ctx.drawImage(foreGround,0,cvs.height-foreGround.height);

    ctx.drawImage(bird,birdXpos,birdYpos);

    birdYpos += gravity;

    ctx.fillStyle = '#000';
    ctx.font='20px';
    ctx.fillText("Score :"+ score, 10, cvs.height-20);

    requestAnimationFrame(draw);
}

draw();