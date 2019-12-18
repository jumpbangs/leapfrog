class Recipes {

    checkUpgradePix(items) {

        if (items.length > 0) {
            let woodCount, stoneCount, copperCount, coalCount;
            for (let x = 0; x < items.length; x++) {
                if (items[x].material === 'wood') {
                    woodCount = items[x].getItemCount();
                }
                if (items[x].material === 'stone') {
                    stoneCount = items[x].getItemCount();
                }
                if (items[x].material === 'copper') {
                    copperCount = items[x].getItemCount();
                }
                if (items[x].material === 'coal') {
                    coalCount = items[x].getItemCount();
                }

            }

            if (woodCount >= 5) {
                return 1;
            }
            if (stoneCount >= 8) {
                return 2;
            }
            if ((copperCount >= 5) && (coalCount >= 5)) {
                return 3;
            }
        }

    }

    checkWeaponUpgrade(items) {
        if (items.length > 0) {
            let woodCount, stoneCount, copperCount, coalCount;
            for (let x = 0; x < items.length; x++) {
                if (items[x].material === 'wood') {
                    woodCount = items[x].getItemCount();
                }
                if (items[x].material === 'stone') {
                    stoneCount = items[x].getItemCount();
                }
                if (items[x].material === 'copper') {
                    copperCount = items[x].getItemCount();
                }
                if (items[x].material === 'coal') {
                    coalCount = items[x].getItemCount();
                }
            }
            if (woodCount >= 8) {
                return 1;
            }
            if (stoneCount >= 10) {
                return 2;
            }
            if ((copperCount >= 5) && (coalCount >= 5)) {
                return 3;
            }
        }

    }

    checkArmourUpgrade(items) {
        if (items.length > 0) {
            let woodCount, stoneCount, copperCount, coalCount;
            for (let x = 0; x < items.length; x++) {
                if (items[x].material === 'wood') {
                    woodCount = items[x].getItemCount();
                }
                if (items[x].material === 'stone') {
                    stoneCount = items[x].getItemCount();
                }
                if (items[x].material === 'copper') {
                    copperCount = items[x].getItemCount();
                }
                if (items[x].material === 'coal') {
                    coalCount = items[x].getItemCount();
                }
            }
            if (woodCount >= 8) {
                return 1;
            }
            if (stoneCount >= 10) {
                return 2;
            }
            if ((copperCount >= 5) && (coalCount >= 5)) {
                return 3;
            }
        }
    }




}