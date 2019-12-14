class SkillChecker {

     checkSkillMatch(skillLevel, material){
        if(skillLevel >= 1){
            if(material === 'grass'){
                return true;
            }
            if(material === 'dirt'){
                return true;
            }
            if(material === 'wood'){
                return  true
            }
        }
        if(skillLevel === 2){
            if(material === 'stone'){
                return true;
            }
            if(material === 'copper'){
                return  true
            }
        }

        if(skillLevel === 3 && skillLevel > 2) {
            if (material === 'diamond') {
                return true;
            }
        }
    }
}