const pool = require('../../databasePool');
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('../dragon');

class DragonTable {

    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            const { birthdate, nickname, generationId } = dragon;
            pool.query(
                'INSERT INTO dragon(birthdate, nickname, "generationId") VALUES($1, $2, $3) RETURNING id',
                [birthdate, nickname, generationId],
                (error, response) => {
                    if (error) return reject(error);

                    const dragonId = response.rows[0].id;

                    Promise.all(dragon.traits.map(({traitType, traitValue }) => {
                        return DragonTraitTable.storeDragonTrait({
                            dragonId, traitType, traitValue
                        });
                    }))
                    .then(() => resolve({ dragonId }))
                    .catch(error => reject(error));
                }
            );
        })
    }

    static getDragon({ dragonId }) {
        return Promise.all([
            new Promise((resolve, reject) => {
                pool.query(
                    `SELECT birthdate, nickname, "generationId" 
                    FROM dragon 
                    WHERE dragon.id = $1`,
                    [dragonId],
                    (error, response) => {
                        if (error) return reject(error);
                        if (response.rows.length === 0) return reject(new Error('Dragon not found in dragon database'));

                        resolve(response.rows[0]);
                    }
                );
            }),
            new Promise((resolve, reject) => {
                pool.query(
                    `SELECT "traitType", "traitValue"
                    FROM trait
                    INNER JOIN dragonTrait
                    ON trait.id=dragonTrait."traitId"
                    WHERE dragonTrait."dragonId" = $1`,
                    [dragonId],
                    (error, response) => {
                        if (error) return reject(error);
                        if (response.rows.length === 0) return reject (new Error('Error accessing dragon traits from database'));
                        resolve(response.rows);
                    }

                )
            })
        ])
        .then(([dragonAttributes, dragonTraits]) => {

            const traits = [];
            dragonTraits.forEach(trait => {
                const traitType = trait.traitType;
                const traitValue = trait.traitValue;
                traits.push({ traitType, traitValue });
            })

            const dragon = new Dragon({ ...dragonAttributes, traits, dragonId });

            return dragon;
        })
        .catch(err => console.error(err));
    }
}


//Testing function for getDragon method:
/*
DragonTable.getDragon({ dragonId: 1 })
    .then(dragon => console.log(dragon) )
    .catch(err => console.error(err) );
*/

module.exports = DragonTable;