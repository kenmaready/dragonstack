const pool = require('../../databasePool');

class AccountDragonTable {

    static storeAccountDragon({ accountId, dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                'INSERT INTO accountDragon("accountId", "dragonId") VALUES($1, $2)',
                [accountId, dragonId],
                (error, response) => {
                    if (error) return reject(error);
                    
                    resolve();
                }
            )
        });
    }

    static getAccountDragons({ accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "dragonId" 
                FROM accountDragon 
                WHERE "accountId"=$1`,
                [accountId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountDragons: response.rows });
                }
            )
        })
    }

    static getDragonAccount({ dragonId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT "accountId"
                FROM accountDragon
                WHERE "dragonId"=$1`,
                [dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ accountId: response.rows[0].accountId });
                }
            )
        })
    }

    static updateDragonAccount({ dragonId, accountId }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE accountDragon
                SET "accountId"=$1
                WHERE "dragonId"=$2`,
                [accountId, dragonId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        });
    }
}


//Testing functions for AccountDragon methods:

/*
AccountDragonTable.storeAccountDragon({ accountId: 1, dragonId: 3 })
    .then(response => console.log("completed") )
    .catch(err => console.error(err) );
*/

/*
AccountDragonTable.getAccountDragons({ accountId: 1 })
    .then(response => console.log(response) )
    .catch(err => console.error(err) );
*/

/*
AccountDragonTable.updateDragonAccount({ dragonId: 1, accountId: 2})
.then(() => console.log("Dragon owner has been updated..."))
.catch(error => console.error(error));
*/

module.exports = AccountDragonTable;