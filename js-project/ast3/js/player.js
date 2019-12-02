function Player(parentElement) {
    this.x =205;
    this.y = 560;
    this.carPosition = 205;
    this.carBox;
    this.parentElement = parentElement;
    var that = this;

    this.init = function () {
        this.carBox = document.createElement('div');
        this.carBox.classList.add('playerDiv');
        this.carBox.style.left = this.x + 'px';
        this.carBox.style.top = this.y + 'px';
        this.carBox.setAttribute('id', 'player');
        this.parentElement.appendChild(this.carBox);

        var playerImg = document.createElement('div');
        playerImg.classList.add('player');
        this.carBox.appendChild(playerImg);
    };

    this.movePlayer = function (direction) {
        var carPosition = that.carBox.style.left;
        if((direction === 'ArrowRight' )|| (direction === 'KeyD')){
            if(that.carPosition <= 205){
                that.carPosition = that.carPosition + (180);
                that.carBox.style.left = that.carPosition + 'px';
            }
        }
        if((direction === 'ArrowLeft' || (direction === 'KeyA'))){
            if(that.carPosition > 25){
                that.carPosition = that.carPosition + (-180);
                that.carBox.style.left = that.carPosition + 'px';
            }
        }
        this.x = carPosition;
    };

    this.removePlayer = function () {
        var roadDiv = document.getElementById('background-frame');
        roadDiv.removeChild(that.carBox);
    }

}