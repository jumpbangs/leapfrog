class Recipes {

    checkUpgrade(items) {
        var woodCount = items.filter((obj) => obj.material === 'wood').length;
        var stoneCount = items.filter((obj) => obj.material === 'stone').length;
        var copperCount = items.filter((obj) => obj.material === 'copper').length;
        var coal = items.filter((obj) => obj.material === 'coal').length;

        if(woodCount >= 5){
            return 1;
        }
        if(stoneCount >= 8){
            return 2;
        }
        if((copperCount >= 5) && (coal >= 5)){
            return 3;
        }
    }


}