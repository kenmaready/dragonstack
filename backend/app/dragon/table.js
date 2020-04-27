const pool = require('../../databasePool');
const AccountDragonTable = require('../accountDragon/table');
const DragonTraitTable = require('../dragonTrait/table');
const Dragon = require('../dragon');

class DragonTable {

    static storeDragon(dragon) {
        return new Promise((resolve, reject) => {
            const { birthdate, nickname, generationId, isPublic, saleValue, sireValue } = dragon;
            pool.query(
                `INSERT INTO dragon(birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue") 
                VALUES($1, $2, $3, $4, $5, $6) 
                RETURNING id`,
                [birthdate, nickname, generationId, isPublic, saleValue, sireValue],
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
                    `SELECT birthdate, nickname, "generationId", "isPublic", "saleValue", "sireValue" 
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

    static getPublicDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id
                FROM dragon
                INNER JOIN accountDragon
                ON dragon.id=accountDragon."dragonId"
                WHERE dragon."isPublic" = TRUE AND accountDragon."accountId" != $1`,
                [accountId],
                (error, response) => {
                    if (error) return reject(error);

                    const publicDragonRows = response.rows;

                    Promise.all(
                        publicDragonRows.map(
                            ({ id }) => { 
                            return this.getDragon({ dragonId: id });
                            }))
                    .then(dragons => resolve({ dragons }))
                    .catch(error => reject(error));
            })
        })
    }


    static updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue }) {
        const settingsMap = { nickname, isPublic, saleValue, sireValue };

        const validQueries = Object.entries(settingsMap).filter(([settingKey, settingValue]) => {
            if (settingValue !== undefined) {
                return new Promise((resolve, reject) => {
                    pool.query(
                        `UPDATE dragon
                        SET "${settingKey}" = $1
                        WHERE id = $2`,
                        [settingValue, dragonId],
                        (error, response) => {
                            if (error) return reject(error);

                            resolve();
                        })
                })
            }
        });

        return Promise.all(validQueries);
    }
}


//Testing function for getDragon nad updateDragon methods:
/*
DragonTable.getDragon({ dragonId: 1 })
    .then(dragon => console.log(dragon) )
    .catch(err => console.error(err) );
*/

/*
DragonTable.updateDragon({ dragonId: 1, nickname: 'Linda', isPublic: true, saleValue: 4})
    .then(() => console.log('successfully updated dragon'))
    .catch(error => console.error(error));
*/

/*
DragonTable.getPublicDragons()
.then((dragons) => console.log(dragons))
.catch(error => console.error(error));
*/

module.exports = DragonTable;