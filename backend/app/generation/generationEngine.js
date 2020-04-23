const Generation = require('.');
const GenerationTable = require('./table');

class GenerationEngine {
    constructor() {
        this.generation = null;
        this.timer = null;
    }

    getNextGen() {
        const generation = new Generation();
        GenerationTable.storeGeneration(generation)
            .then(({ generationId }) => {
                this.generation = generation;
                this.generation.generationId = generationId;
                console.log(this.generation);

                this.timer = setTimeout(() => {
                    this.getNextGen();
                }, this.generation.expiration - Date.now());
            })
            .catch((error) => console.error(error));
    }

    start() {
        this.getNextGen();
    }

    stop() {
        clearTimeout(this.timer);
    }
}

module.exports = GenerationEngine;