class Recipes {

    checkUpgradePix(items) {
        let woodCount = items.filter((obj) => obj.material === 'wood').length;
        let stoneCount = items.filter((obj) => obj.material === 'stone').length;
        let copperCount = items.filter((obj) => obj.material === 'copper').length;
        let coal = items.filter((obj) => obj.material === 'coal').length;

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

    checkWeaponUpgrade(items){
        let woodCount = items.filter((obj) => obj.material === 'wood').length;
        let stoneCount = items.filter((obj) => obj.material === 'stone').length;
        let copperCount = items.filter((obj) => obj.material === 'copper').length;
        let coal = items.filter((obj) => obj.material === 'coal').length;

        if(woodCount >= 8){
            return 1;
        }
        if(stoneCount >= 10){
            return 2;
        }
        if((copperCount >= 5) && (coal >= 5)){
            return 3;
        }
    }

    checkArmourUpgrade(items){
        let woodCount = items.filter((obj) => obj.material === 'wood').length;
        let stoneCount = items.filter((obj) => obj.material === 'stone').length;
        let copperCount = items.filter((obj) => obj.material === 'copper').length;
        let coal = items.filter((obj) => obj.material === 'coal').length;

        if(woodCount >= 8){
            return 1;
        }
        if(stoneCount >= 10){
            return 2;
        }
        if((copperCount >= 5) && (coal >= 5)){
            return 3;
        }
    }


}