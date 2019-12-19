class Food {
    constructor(xPos, yPos){
        this.x = xPos;
        this.y = yPos;
        this.state = 4;

        this.foodType;
        this.foodImgPos;
        this.healPoints;
    }

    
    foodDetails(type){
        switch (type) {
            case 1:
                this.foodType = 1;
                this.foodImgPos = 0;
                this.healPoints  = 1 ;
                return this;
            case 2:
                this.foodType = 2;
                this.foodImgPos = 32;
                this.healPoints = 5;
                return this;

        }
    }
}