function scoreboard(parentElement) {
    this.scoreboard = undefined;
    this.boardTitle;
    this.scoreCount = 0;
    this.presentScore = null;
    this.presentSpeed = null;
    this.parentElement = parentElement;

    this.init = function () {
        this.scoreboard = document.createElement('div');
        this.scoreboard.classList.add('scoreboard');
        this.parentElement.appendChild(this.scoreboard);

        this.boardTitle = document.createElement('h3');
        this.boardTitle.appendChild(document.createTextNode('Score Table'));
        this.boardTitle.style.textAlign +='center';
        this.boardTitle.style.borderBottom +='1px solid black';
        this.scoreboard.appendChild(this.boardTitle);


        this.presentScore = document.createElement('div');
        this.presentScore.innerHTML = 'Score :';
        this.scoreboard.appendChild(this.presentScore);

        this.presentSpeed = document.createElement('div');
        this.presentSpeed.innerHTML = 'Speed : 10 km/h' ;
        this.scoreboard.appendChild(this.presentSpeed);

        this.presentScore.style.textAlign += 'center';
        this.presentSpeed.style.textAlign += 'center';
        return this;
    }

    this.updateScore = function () {
        var lol = this.scoreCount++;

        this.presentScore.innerHTML = 'Score :' +lol * 10;
        this.presentSpeed.innerHTML = 'Speed :' + lol * 10 +' km/h';
    }


}