var imgIndex = 1;
var imgTimer = 5000;

var images = document.getElementById('image-wrapper');
var imgIndicator = document.getElementById('dot-indicator');


/*
    Slider Image Functions
 */
slider(imgIndex);
setInterval(function () {
    imageSlider(imgIndex);
}, imgTimer);


function slider(indexOfImage) {
    var i;
    var numOfImages = images.children;
    if(indexOfImage > numOfImages.length){
        imgIndex = 1;
    }
    if(indexOfImage < 1){
        imgIndex = numOfImages.length;
    }
    for(i = 0; i < numOfImages.length; i++){
        images.children[i].style.display ='none';
    }
    numOfImages[imgIndex-1].style.display='block';
}


function imageSlider(indexOfImage) {
    clearInterval(imgTimer);
    if(indexOfImage < 0){
        slider(--imgIndex);
    } else {
        slider(++imgIndex);
    }
    imgTimer = setInterval(function () {
       slider(indexOfImage++);
    }, 1000);
}

function imagePoint(currentDot){
    clearInterval(imgTimer);
    imgTimer = setInterval(function(){
        imageSlider(currentDot + 1)
    }, 1000);
    slider(imgIndex = currentDot);
}

/*
    Left Btn Click Handler
 */
document.getElementById('leftBtn').onclick = function () {
    imageSlider(-1);
};


/*
    Right Btn Click Handler
 */
document.getElementById('rightBtn').onclick = function () {
    imageSlider(+1);
};

/*
    Slider Handler
 */

// window.onload = function () {
//     var dots = imgIndicator.getElementsByTagName('span');
//     for(var x = 0; x < dots.length; x++){
//         var dot = dots[x];
//         dot.onclick =function () {
//             console.log(dots.indexOf(dot));
//         }
//     }
// };

