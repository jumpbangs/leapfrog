var conatiner = document.createElement('div');
var imageSlider = document.createElement('div');
var images = document.createElement('img');
var leftBtn = document.createElement('span');
var rightBtn = document.createElement('span');


conatiner.className='container-carousel';
imageSlider.className+='carousel-wrapper';
images.className+='carousel-wrapper__img';
leftBtn.className+='arrow-left';
rightBtn.className+='arrow-right';


var imageFiles = [
    'img-1.jpg',
    'img-2.jpg',
    'img-3.jpg',
    'img-4.jpg',
    'img-5.jpg',
    'img-6.jpg',
];

var mainWrapper = document.getElementById('image-slider');

mainWrapper.appendChild(conatiner);
conatiner.appendChild(imageSlider);
imageSlider.appendChild(images);
conatiner.appendChild(leftBtn);
conatiner.appendChild(rightBtn);

leftBtn.addEventListener('click', leftSide);
leftBtn.addEventListener('click', rightSide);

var counter = 0;

var  interval;


function startTimer() {
    clearInterval(interval);
    interval = setInterval(sliderInterval, 5000);
}

function autoSlider() {
    images.src='img/'+imageFiles[counter];
    counter++;
    if (counter > (imageFiles.length - 1)){
        counter = 0;
    }
}

var sliderInterval = setInterval( function () {
    autoSlider();
}, 1000);


function leftSide(){
    console.log("left");
}

function rightSide(){
    console.log("right");
}

