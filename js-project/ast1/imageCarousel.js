/**
 *  Variables Used
 */
var imgIndex = 1;
var imgTimer = 3000;

var LEFTSIDE    = false;
var RIGHTSIDE   = true;

var images          = document.getElementById("image-wrapper");
var imgIndicator    = document.getElementById("dot-indicator");

var totalImages     = images.children.length;
var imageWidth      = images.children[0].offsetWidth;
var totalWidth      = imageWidth * totalImages;

/**
 *  DOM Elements
 */
var imageContainer  = document.getElementsByClassName("container-carousel")[0];
var sliderIndicator = document.createElement('div');
var leftBtn         = document.createElement("span");
var rightBtn        = document.createElement("span");

leftBtn.className           += "arrow-left";
rightBtn.className          += "arrow-right";
sliderIndicator.className   +="carousel-indicator";

imageContainer.appendChild(leftBtn);
imageContainer.appendChild(rightBtn);
imageContainer.appendChild(sliderIndicator);

leftBtn.addEventListener("click", leftSide);
rightBtn.addEventListener("click", rightSide);


for(var x = 0; x < totalImages; x++){
    var bulletPoint = document.createElement('span');
    bulletPoint.className+="indicator-circle";
    sliderIndicator.appendChild(bulletPoint);
}

var points = sliderIndicator.getElementsByTagName('span');

Object.values(points).forEach(function(value, index)  {
    value.addEventListener('click',function(){
        Object.values(points).forEach(function(value, index)  {
            value.classList.remove('active');
        });
        value.classList.add('active');
        imagePoint(index);
    });
});

/*
    Slider Image Functions
 */
slider(imgIndex, RIGHTSIDE);

setInterval(function() {
  imageSlider(imgIndex);
  clearInterval(imgTimer);
}, imgTimer);

function slider(indexOfImage, side) {
  var i;
  var numOfImages = images.children;
  if (indexOfImage > numOfImages.length) {
    imgIndex = 1;
  }
  if (indexOfImage < 1) {
    imgIndex = numOfImages.length;
  }
  for (i = 0; i < numOfImages.length; i++) {
    // images.children[i].style.display = 'block';
  }

  if (side === true) {
    clearInterval(imgTimer);
    animate(imgIndex);
  } else {
    clearInterval(imgTimer);
    animateLeft(imgIndex);
  }
}

function imageSlider(indexOfImage) {
  if (indexOfImage < 0) {
    slider(--imgIndex, LEFTSIDE);
  } else {
    slider(++imgIndex, RIGHTSIDE);
  }
}

function imagePoint(currentImg) {
  clearInterval(imgTimer);
  imgTimer = setInterval(function() {
    imageSlider(currentImg + 1);
  }, 1000);
  slider((imgIndex = currentImg));
}


/**
 *  Left Btn Click Handler
 */
function leftSide() {
  imageSlider(-1);
}

/**
 *  Right Btn Click Handler
 */
function rightSide() {
  imageSlider(+1);
}

/**
 *  Animates Right Side (deafult)
 */
function animate(indexOfImage) {
  clearInterval(imgTimer);
  clearInterval(rightSlideImage);
  var counter = 0;

  var rightSlideImage = setInterval(function() {
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
}

/**
 *  AnimatesLeft Side
 */
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
}
