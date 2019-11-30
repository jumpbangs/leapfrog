function scoreboard(parentElement) {
    this.scoreboard = undefined;
    this.boardTitle;
    this.scoreCount = 0;
    this.presentScore = null;
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
        this.scoreboard.appendChild(this.presentScore);
        return this;
    }

    this.updateScore = function (val) {

        this.presentScore.innerHTML = this.scoreCount;
    }


}