function Bullet(parentElement) {
    this.bulletCounter = 0;
    this.bulletYPos = 0;
    this.bulletDiv = null;
    this.parentElement = parentElement;
    this.bulletYPos = 615;

    this.init = function (PosX , PosY) {
        this.bulletCounter++;
        this.x = PosX;
        this.y = PosY;
        this.bulletDiv = document.createElement('div');
        this.bulletDiv.classList.add('bulletDiv');
        this.bulletDiv.style.left = (this.x + 55)+ 'px';
        this.bulletDiv.style.top = (this.y - 45)  + 'px';
        this.parentElement.appendChild(this.bulletDiv);
    }

    this.bulletMove =function () {
        this.bulletYPos -= 20;
        this.bulletDiv.style.top = this.bulletYPos + 'px';
        if (this.bulletYPos <= 0) {
            this.bulletYPos = 615;
            this.parentElement.removeChild(this.bulletDiv);
            this.bulletCounter--;
        } else {
            return this.bulletYPos;
        }
    }

    this.bulletRemove = function () {
        var roadDiv = document.getElementById('background-frame');
        roadDiv.removeChild(this.bulletDiv);
    }
}