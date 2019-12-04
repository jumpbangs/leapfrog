class Bird {

    constructor(parentElement){
        // this.pull = 0.05;
        this.pull = 0.05;
        this.gravitySpeed = 0;
        this.speedX = 0;
        this.speedY = 0;
        this.y = 100;
        this.x = 150;
        this.mainElement = parentElement;
        this.flappyBird = document.createElement('div');
        this.birdImage = document.createElement('img');
    }

    createBird(){
        this.flappyBird.classList.add('birdDiv');
        this.flappyBird.style.top = this.x + 'px';
        this.flappyBird.style.left = this.y + 'px'
        this.birdImage.setAttribute('src', 'img/bird.png');
        this.mainElement.appendChild(this.flappyBird);
        this.flappyBird.appendChild(this.birdImage);
    }

    gravity(){
        this.gravitySpeed += this.pull;
        this.x += this.speedX;
        this.y += Math.ceil(this.speedY + this.gravitySpeed);
    }

    flying(direction) {
        if (direction > 0) {
            this.y = Math.ceil(this.y + (-1) * direction * 25);
            this.flappyBird.style.top = this.y + 'px';
            this.flappyBird.style.transform ='rotate(-45deg)';
        }
    }


    updateBirdPos(){
        this.gravity();
        this.flappyBird.style.top = this.y + 'px';
        this.flappyBird.style.transform ='rotate(20deg)';
        if (this.y >= 370){
            this.flappyBird.style.top = 370 + 'px';
            this.flappyBird.style.transform += 'rotate(45deg)';
            document.onkeydown = null;
            return true;
        } else {
            return false;
        }
    }





}