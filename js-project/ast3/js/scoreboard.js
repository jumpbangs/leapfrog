function scoreboard(parentElement) {
    this.scoreboard = undefined;
    this.boardTitle;
    this.scoreCount = 0;
    this.presentScore = 0;
    this.presentSpeed = 0;
    this.highScore = [];
    this.parentElement = parentElement;

    this.init = function () {
        this.scoreboard = document.createElement('div');
        this.scoreboard.classList.add('scoreboard');
        this.parentElement.appendChild(this.scoreboard);

        this.boardTitle = document.createElement('h3');
        this.boardTitle.appendChild(document.createTextNode('Score Table'));
        this.boardTitle.style.textAlign += 'center';
        this.boardTitle.style.borderBottom += '1px solid black';
        this.scoreboard.appendChild(this.boardTitle);


        this.presentScore = document.createElement('div');
        this.presentScore.innerHTML = 'Score : 0';
        this.scoreboard.appendChild(this.presentScore);

        this.presentSpeed = document.createElement('div');
        this.presentSpeed.innerHTML = 'Speed : 2 km/h';
        this.scoreboard.appendChild(this.presentSpeed);

        this.highScore = document.createElement('div');
        this.scoreboard.appendChild(this.highScore);

        this.presentScore.style.textAlign += 'center';
        this.presentSpeed.style.textAlign += 'center';
        this.presentSpeed.style.paddingBottom += '10px';
        this.presentSpeed.style.borderBottom += '1px solid black';
        this.highScore.style.textAlign += 'center';

        return this;
    };

    this.updateScore = function (value) {
        if (value >= 1){
            var score = value + 1;
            this.presentScore.innerHTML = 'Score :' + score * 10;
            this.presentSpeed.innerHTML = 'Speed :' + score * 2 + ' km/h';
        }

        return true;
    }

    this.showHighScore = function (array) {
        console.log(array);
        if(Array.isArray(array)){
            var scoreCounter = array.length;
            var divScore = document.createElement('div');
            this.highScore.appendChild(divScore);
            // if (scoreCounter > 1){
            //     divScore.innerHTML ='HighScore <br>'+ 'Level :' + (scoreCounter+1) + 'Score :' + (scoreCounter+1)*10;
            // } else {
                divScore.innerHTML ='HighScore <br>'+ 'Speed :' + scoreCounter + 'Score :' + scoreCounter*10;
            // }
        }
    };

    this.removeScoreboard = function () {
        var theScoreboard = document.getElementById('background-frame');
        theScoreboard.removeChild(this.scoreboard);
    };

    this.resetScore = function () {
        this.presentScore.innerHTML = 'Score : 0';
        this.presentSpeed.innerHTML = 'Speed : 2 km/h';
    }


}