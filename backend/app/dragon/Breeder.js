const Dragon = require('./index');
const base64 = require('base-64');

class Breeder {
    static breedDragon({mother, father}) {
        const motherTraits = mother.traits;
        const fatherTraits = father.traits;

        const babyTraits = [];

        motherTraits.forEach(({ traitType, traitValue}) => {
            const motherTrait = traitValue;
            const fatherTrait = fatherTraits.find(
                trait => trait.traitType === traitType
            ).traitValue;

            babyTraits.push({
                traitType,
                traitValue: Breeder.pickTrait({ motherTrait, fatherTrait })
            });
        });

        return new Dragon({ nickname: 'Unnamed Baby Dragon', traits: babyTraits });
    }

    //  This method selects trait based on two incoming traits
    //  Incoming traits are weighted based on how high the string
    // value is, which simulates dominance/recessiveness of traits,
    // with some randmness added
    static pickTrait({ motherTrait, fatherTrait }) {
        if (motherTrait === fatherTrait) return motherTrait;

        const motherTraitCharSum = Breeder.charSum(base64.encode(motherTrait));
        const fatherTraitCharSum = Breeder.charSum(base64.encode(fatherTrait));

        const randNum = Math.floor(Math.random() * (motherTraitCharSum + fatherTraitCharSum));

        return (randNum < motherTraitCharSum) ? motherTrait : fatherTrait;
    }


    static charSum(string) {
        return string.split('').reduce(
            (sum, character) => sum += character.charCodeAt(),
            0);
    }

}

// Testing function for Breeder class:

/*
const ma = new Dragon({nickname: 'Ma'});
const pa = new Dragon({nickname: 'Pa'});
console.log(ma);
console.log(pa);
const baby = Breeder.breedDragon({ mother: ma, father: pa});
console.log(baby);
*/

module.exports = Breeder;