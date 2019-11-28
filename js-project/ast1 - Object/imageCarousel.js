function sliderContainer(sliderId, length, height) {
    this.length = length;
    this.height = height;

    this.initContainer = function () {
        var sliderContainer = document.getElementsByClassName(sliderId);
        sliderContainer[0].style.width = this.length + 'px';
        sliderContainer[0].style.height = this.height + 'px';
        this.element = sliderContainer[0];
        return sliderContainer;
    };


    this.getLeftBtn = function () {
        var leftBtn = document.createElement('span');
        leftBtn.classList.add('arrow-left');
        this.element.appendChild(leftBtn);
        return leftBtn;
    };

    this.getRightBtn = function () {
        var rightBtn = document.createElement('span');
        rightBtn.classList.add('arrow-right');
        this.element.appendChild(rightBtn);
        return rightBtn;
    };

    this.getSliderIndicator = function () {
        var sliderIndicator = document.createElement('div');
        sliderIndicator.classList.add('carousel-indicator');
        this.element.appendChild(sliderIndicator);
        return sliderIndicator;
    };

}

function sliderWrapper(sliderId, length, height, imgTimer) {
    sliderContainer.call(this, sliderId, length, height);

    var that = this;
    this.length = length;
    this.height = height;
    this.imgTimer = imgTimer;
    this.galleryIndex = 1;

    this.LEFTSIDE = false;
    this.RIGHTSIDE = true;
    this.sliderContainer = this.initContainer();
    this.leftBtn = this.getLeftBtn();
    this.rightBtn = this.getRightBtn();
    this.SliderIndicator = this.getSliderIndicator();

    this.startSlider = function () {
        setInterval(function () {
            imageSlider(that.galleryIndex);
            clearInterval(that.imgTimer);
        }, 3000);
    };

    function getImages() {
        return that.element.getElementsByTagName('img');
    };

    function getImageWidth() {
        var image = getImages();
        return image[0].offsetWidth;
    };

    function getTotalImgs() {
        var image = getImages();
        return image.length;
    };

    function getTotalLength() {
        var totalImages = getTotalImgs();
        var imgWidth = getImageWidth();
        return totalImages * imgWidth;
    };


    this.loadPoints = function () {
        var Images = getImages();
        for (var x = 0; x < Images.length; x++) {
            var bulletPoint = document.createElement('span');
            bulletPoint.className += "indicator-circle";
            that.SliderIndicator.appendChild(bulletPoint);
        }
        ;

        var points = that.SliderIndicator.getElementsByTagName('span');
        Object.values(points).forEach(function (value, index) {
            value.addEventListener('click', function () {
                Object.values(points).forEach(function (value, index) {
                    value.classList.remove('active');
                });
                value.classList.add('active');
                imagePoint(index);
                // console.log(index);
            });
        });
    };


    function slider(indexOfImage, side) {

        var numOfImages = getTotalImgs();
        if (indexOfImage > numOfImages) {
            that.galleryIndex = 1;
        }
        if (indexOfImage < 1) {
            that.galleryIndex = numOfImages.length;
        }
        if (side === true) {
            clearTimeout(that.imgTimer);
            animate(that.galleryIndex);
        } else {
            clearTimeout(that.imgTimer);
            animateLeft(that.galleryIndex);
        }
    };

    function imageSlider(indexOfImage) {
        if (indexOfImage < 0) {
            slider(--that.galleryIndex, that.LEFTSIDE);
        } else {
            slider(++that.galleryIndex, that.RIGHTSIDE);
        }
    };

    function animate(indexOfImage) {
        clearInterval(imgTimer);
        var images = document.getElementById('image-wrapper');
        var counter = 0;
        var imageWidth = getImageWidth();
        var totalWidth = getTotalLength();

        var rightSlideImage = setInterval(function () {
            counter += 10;
            var newPos = counter + (indexOfImage - 2) * imageWidth;
            images.style.left = "-" + newPos + "px";
            if (counter >= 400) {
                clearInterval(rightSlideImage);
                if (newPos >= totalWidth) {
                    indexOfImage = 0;
                }
            }
        }, 10);
    };

    function animateLeft(indexOfImage) {
        clearInterval(imgTimer);
        var counter = 410;
        var images = document.getElementById('image-wrapper');
        var imageWidth = getImageWidth();
        var leftSildeImage = setInterval(function() {
            counter -= 10;
            var newPos = counter + (indexOfImage - 2) * imageWidth;
            images.style.left = "-" + newPos + "px";
            if (counter >= 0) {
                clearInterval(leftSildeImage);
            }
        }, 100);
    };


    this.enableBtn = function () {
        var leftBtn = that.getLeftBtn();
        var rightBtn = that.getRightBtn();

        leftBtn.addEventListener('click', function () {
            imageSlider(-1);
            console.log("left Btn");
        });

        rightBtn.addEventListener('click', function () {
            imageSlider(+1);
            console.log("right btn");
        });
    };

    function imagePoint(currentImg) {
        clearInterval(imgTimer);
        imgTimer = setInterval(function() {
            imageSlider(currentImg + 1);
        }, 1000);
        slider((that.galleryIndex = currentImg));
    }

}


var lol = new sliderWrapper('container-carousel', 400, 400, 3000);
lol.startSlider();
lol.loadPoints();
lol.enableBtn();