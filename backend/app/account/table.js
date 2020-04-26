const pool = require('../../databasePool');
const { STARTING_BALANCE } = require('../config');

class AccountTable {
    
    static storeAccount(account) {
        return new Promise((resolve, reject) => {
            pool.query(
                `INSERT INTO account("usernameHash", "passwordHash", balance) 
                VALUES($1, $2, $3) 
                RETURNING id`,
                [account.usernameHash, account.passwordHash, STARTING_BALANCE],
                (error, response) => {
                    if (error) return reject(error);
    
                    const accountId = response.rows[0].id;
                    resolve({ accountId });
                }
            );
        })
    }

    static getAccount({ usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `SELECT id, "passwordHash", "sessionId", balance
                FROM account
                WHERE "usernameHash" = $1`,
                [usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    resolve({ account: response.rows[0] });
                }
            )
        });
    }

    static updateSessionId({ sessionId, usernameHash }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account
                SET "sessionId" = $1
                WHERE "usernameHash" = $2`,
                [sessionId, usernameHash],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        });
    }

    static updateBalance({ accountId, value }) {
        return new Promise((resolve, reject) => {
            pool.query(
                `UPDATE account
                SET balance = balance + $1
                WHERE id = $2`,
                [value, accountId],
                (error, response) => {
                    if (error) return reject(error);

                    resolve();
                }
            )
        });
    }
}

// Test runs for methods from AccountTable:

/*
const { hash } = require('../account/helper');

AccountTable.updateBalance({ accountId: 1, value: -7})
.then(() => console.log("Balance updated"))
.catch(error => console.error(error));
*/

module.exports = AccountTable;