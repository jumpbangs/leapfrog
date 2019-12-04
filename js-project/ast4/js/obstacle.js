class Obstacle{
    constructor(parentElement) {
        this.topHeight = 0;
        this.bottomHeight = 0;
        this.x = parentElement.offsetWidth;
        this.mainElement = parentElement;
        this.topPipe = document.createElement('div');
        this.bottomPipe = document.createElement('div');
    }

    createObstacle(){
        this.randomHeight = getRndInteger(200, 50);
        this.topHeight = this.randomHeight;
        this.bottomHeight = this.mainElement.offsetHeight - this.topHeight - 100;

        this.topPipe.style.height = this.topHeight  +'px';
        this.topPipe.style.left = this.x + 'px';
        this.topPipe.classList.add('topPipe');

        this.bottomPipe.style.height = this.bottomHeight +'px';
        this.bottomPipe.style.left = this.x +'px';
        this.bottomPipe.classList.add('bottomPipe');

        this.mainElement.appendChild(this.topPipe);
        this.mainElement.appendChild(this.bottomPipe);
    }
    updateObstacle() {
        this.x -= 5;
        this.topPipe.style.left = this.x +'px';
        this.bottomPipe.style.left = this.x +'px';
    }
    removeObstacle(){
        this.topPipe.remove();
        this.bottomPipe.remove();
    }

}

getRndInteger = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
