const { REFRESH_RATE, SECONDS, MINUTES } = require('../config');
const Dragon = require('../dragon');
const DragonTable = require('../dragon/table');

const refreshRate = REFRESH_RATE * SECONDS;

class Generation {
    constructor() {
        this.expiration = this.calculateExpiration();
        this.generationId = undefined;
    }

    calculateExpiration() {
        const expirationPeriod = Math.floor(Math.random() * (refreshRate/2));
        const msUntilExpiration = Math.random() < 0.5 ?
            refreshRate - expirationPeriod :
            refreshRate - expirationPeriod;

        return new Date(Date.now() + msUntilExpiration);
    }

    newDragon(props) {
        const nickname = props ? props.nickname : null;
        if (Date.now() > this.expiration) {
            throw new Error(`This generation expired on ${this.expiration}.`);
        }

        const dragon = new Dragon({ nickname, generationId: this.generationId });
        return dragon;
    }
}

module.exports = Generation;