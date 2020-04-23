const TRAITS = require('../../data/traits.json');

const DEFAULT_PROPERTIES = {
    nickname: 'unnamed',
    get birthdate() {
        return new Date();
    },
    get randomTraits() {
        const traits = [];
        TRAITS.forEach((TRAIT) => {
            const traitType = TRAIT.type;
            const traitValue = TRAIT.values[Math.floor(Math.random() * TRAIT.values.length)];
            traits.push({ traitType, traitValue });
        });
        return traits;
    },
    generationId: undefined,
    dragonId: undefined
}

class Dragon {
    constructor({ birthdate, nickname, traits, generationId, dragonId } = {}) {
        this.birthdate = birthdate || DEFAULT_PROPERTIES.birthdate;
        this.nickname = nickname || DEFAULT_PROPERTIES.name;
        this.traits = traits || DEFAULT_PROPERTIES.randomTraits;
        this.generationId = generationId || DEFAULT_PROPERTIES.generationId;
        this.dragonId = dragonId || DEFAULT_PROPERTIES.dragonId;
    }

    setDragonId(id) {
        this.dragonId = id;
    }

    info() {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};      
        console.log(`This is a Dragon named ${this.nickname}, born on ${this.birthdate.toLocaleDateString("en-US", options)}.`);
        console.log(`Traits:`);
        this.traits.forEach((trait) => {
            console.log(trait.traitValue)
        });
        console.log();
    }
};

module.exports = Dragon;