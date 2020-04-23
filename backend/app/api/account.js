const { Router } = require('express');
const AccountTable = require('../account/table');
const AccountDragonTable = require('../accountDragon/table');
const DragonTable = require('../dragon/table');
const Session = require('../account/session');
const { hash } = require('../account/helper');
const { setSession, authenticatedAccount } = require('./helper');

const router = new Router();

router.post('/signup', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        if (!account) {
            return AccountTable.storeAccount({ usernameHash, passwordHash })
        } else {
            const error = new Error('This username has already been taken.');
            error.statusCode = 409;
            throw error;
        }
    })
    .then((id) => {
        return setSession({ username, res });
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.post('/login', (req, res, next) => {
    const { username, password } = req.body;
    const usernameHash = hash(username);
    const passwordHash = hash(password);

    AccountTable.getAccount({ usernameHash })
    .then(({ account }) => {
        if (account) {
            if (account.passwordHash === passwordHash) {
                const { sessionId } = account;

                return setSession({ username, sessionId, res });
            } else {
                const error = new Error('Password is incorrect.');
                error.statusCode = 401;
                throw error;
            }
        } else {
            const error = new Error('Invalid username. Account does not exist.');
            error.statusCode = 401;
            throw error;
        }
    })
    .then(({ message }) => res.json({ message }))
    .catch(error => next(error));
});

router.get('/logout', (req, res, next) => {
    const { username } = Session.parse(req.cookies.sessionString);

    AccountTable.updateSessionId({ 
        sessionId: null, 
        usernameHash: hash(username) 
    })
    .then(() => {
        res.clearCookie('sessionString');
        res.json({ message: 'User has been logged out.'});
    })
    .catch(error => next(error));
})

router.get('/authenticated', (req, res, next) => {
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
    .then(({ authenticated }) =>  res.json({ authenticated }) )
    .catch(error => next(error));
});

router.get('/dragons', (req, res, next) => {
    const { sessionString } = req.cookies;
    authenticatedAccount({ sessionString })
    .then( ({ account }) => {
        return AccountDragonTable.getAccountDragons({ accountId: account.id })
    })
    .then(({ accountDragons }) => {
        return Promise.all(
            accountDragons.map(accountDragon => {
                return DragonTable.getDragon({ dragonId: accountDragon.dragonId })
            })
        )
    })
    .then(dragons => res.json({ dragons }))
    .catch(error => next(error));
});

module.exports = router;

