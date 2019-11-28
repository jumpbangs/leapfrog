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
    var imgIndex = 0;
    this.length = length;
    this.height = height;
    this.imgTimer = imgTimer;

    this.sliderContainer = this.initContainer();
    this.leftBtn = this.getLeftBtn();
    this.rightBtn = this.getRightBtn();
    this.SliderIndicator = this.getSliderIndicator();

    // this.startSlider = function () {
    //     setInterval(function () {
    //         imageSlider(imgIndex);
    //         clearInterval(that.imgTimer);
    //     },1000);
    // };

    function getImages(){
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
        };

        var points = that.SliderIndicator.getElementsByTagName('span');
        Object.values(points).forEach(function(value, index)  {
            value.addEventListener('click',function(){
                Object.values(points).forEach(function(value, index)  {
                    value.classList.remove('active');
                });
                value.classList.add('active');
                // imagePoint(index);
                console.log(index);
            });
        });
    };



    function slider(indexOfImage) {
        var imgIndex = 1;
        var numOfImages = getTotalImgs();
        if (indexOfImage > numOfImages) {
            imgIndex = 1;
        }
        if (indexOfImage < 1) {
            imgIndex = numOfImages.length;
        }
        // console.log("Image Index", imgIndex);
        // console.log("indexOfImage", indexOfImage);
        animate(imgIndex);
    };

    function imageSlider(n) {
        if (n < 0) {
            console.log("Hellow");
            slider(--imgIndex);
        } else {
            slider(++imgIndex);
        }
    };

    function animate(indexOfImage) {
        clearInterval(imgTimer);
        // clearInterval(rightSlideImage);
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
        clearInterval(leftSildeImage);
        var counter = 410;

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
        var leftBtn = this.getLeftBtn();
        var rightBtn = this.getRightBtn();

        leftBtn.addEventListener('click', function () {
            // imageSlider(-1);
            console.log("left Btn");
        });

        rightBtn.addEventListener('click', function () {
           // imageSlider(+1);
            console.log("right btn");
        });
    };

}


var lol = new sliderWrapper('container-carousel', 400, 400, 3000);
lol.loadPoints();
lol.enableBtn();