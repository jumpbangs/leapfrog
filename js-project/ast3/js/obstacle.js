function obstacle(parentElement) {
    this.x = 0;
    this.y = 0;
    this.otherCarsDiv = null;
    this.parentElement = parentElement;
    this.otherCarsDiv = document.createElement('div');

    var that = this;

    this.init = function() {
        var randGen = getRandom(0,2);
        this.otherCarsDiv.classList.add('otherCarDiv');
        if(randGen === 0){
            that.x = 25;
            this.otherCarsDiv.style.left = 25 + 'px';
        } else if (randGen === 1){
            that.x = 205;
            this.otherCarsDiv.style.left = 205 + 'px';
        } else {
            that.x = 385;
            this.otherCarsDiv.style.left = 385 + 'px';
        }

        this.otherCarsDiv.style.top = getRandom(30, 200) + 200  + 'px';
        this.otherCarsDiv.setAttribute('id', 'obstacle');
        this.parentElement.appendChild(this.otherCarsDiv);

        var otherCarImg = document.createElement('div');
        otherCarImg.classList.add('otherCar');
        this.otherCarsDiv.appendChild(otherCarImg);
    }

    this.moveAway = function (speed) {
        this.y += speed;
        this.otherCarsDiv.style.top = this.y + 'px';
    };

    this.removeCar = function () {
        var roadDiv = document.getElementById('background-frame');
        roadDiv.removeChild(that.otherCarsDiv);
    }


}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}


