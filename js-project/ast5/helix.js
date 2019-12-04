class helix {

    constructor(numCols, numRows, radius, numStrands, speed){
        this.canvas = document.getElementById('my_canvas');
        this.ctx = this.canvas.getContext('2d');
        this.frameCount = 0;
        this.phase = 0;
        this.speed = speed;
        this.strandNum = numStrands;
        this.numRows = numRows;
        this.numCols = numCols;
        this.circleRad = radius;
        this.cW = this.ctx.canvas.width;
        this.cH = this.ctx.canvas.height;

    }

    drawHelix(){
        let x = 0;
        this.ctx.fillStyle = 'rgb(4, 58, 74)';
        this.ctx.fillRect(0,0,this.cW, this.cH);
        this.frameCount++;
        this.phase = this.frameCount * this.speed;

        //"Grid" of Circles
        for(var strand = 0; strand < this.strandNum; strand++){
            //Re-maps a number from one range to another MAP from Processing Language
            // Formula is start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
            //map(strand, 0, numStrands, 0, TWO_PI);
            var strandPhrase = this.phase + (Math.PI  * (strand/this.strandNum));

            for(var col = 0; col < this.numCols; col++){
                //map(col, 0, numCols, 0, TWO_PI);
                var colOffset = (Math.PI *(col)/this.numCols);
                //map(col, 0, numCols, 50, width - 50);
                x = (50 + (this.cW - 50 - 50)*col/(this.numCols));

                for(var row = 0; row < this.numRows; row++){

                    //Makes the Y Position Visible
                    var y = this.cH/2 + row * 10 + Math.sin(strandPhrase + colOffset) * 50;

                    //Cosine Wave that is moving from 0 to 1 and the radius of the circle
                    var sizeOffset = (Math.cos(strandPhrase - (row/this.numRows)+ colOffset)+1) *0.5;
                    var circleSize = sizeOffset * this.circleRad;

                    this.ctx.beginPath();
                    this.ctx.fillStyle = 'rgb(253,174,120)';
                    this.ctx.ellipse(x, y, circleSize,circleSize, 0, 2 * Math.PI, false);
                    this.ctx.fill();
                    this.ctx.closePath();
                }
            }
        }
    }

}

var figure = new helix(10, 16, 5, 2, 0.03);

setInterval( () =>{
    figure.drawHelix();
}, 30)
