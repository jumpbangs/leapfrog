class backGround {
    constructor(parentElement) {
        this.positionX = 0;
        this.mainElement = parentElement;
    };

    createBackground() {
        this.mainElement.classList.add('gameBackground');
        this.foreground = document.createElement('div');
        this.foreground.classList.add('foreground');
        this.mainElement.appendChild(this.foreground);
    };

    updateBackground() {
        this.positionX = this.positionX - 10;
        this.foreground.style.backgroundPositionX = this.positionX + 'px';
    };
}