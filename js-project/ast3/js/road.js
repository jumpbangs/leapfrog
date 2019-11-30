function Road(parentElement) {
    this.element = null;
    this.backgroundY = 0;
    this.mainElement = parentElement;

    this.create = function() {
        this.element = document.createElement('div');
        this.element.classList.add( 'roadBackground');
        this.element.setAttribute('id', 'background-frame');
        this.mainElement.appendChild(this.element);
    };

    this.update = function(speed) {
        this.backgroundY += speed;
        this.element.style.backgroundPositionY = this.backgroundY + 'px';

    };
}