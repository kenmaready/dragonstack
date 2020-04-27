const { Router } = require('express');
const DragonTable = require('../dragon/table');
const AccountTable = require('../account/table');
const AccountDragonTable = require('../accountDragon/table');
const Breeder = require('../dragon/Breeder');
const { authenticatedAccount } = require('./helper');

const router = new Router();

router.get('/new', (req, res, next) => {
    let accountId, dragon;

    authenticatedAccount({ sessionString: req.cookies.sessionString })
        .then(({ account }) => {
            accountId = account.id;
            dragon = req.app.locals.engine.generation.newDragon({ accountId });

            return DragonTable.storeDragon(dragon);
        })
        .then(({ dragonId }) => {
            dragon.setDragonId(dragonId);
            return AccountDragonTable.storeAccountDragon({ accountId, dragonId });
        })
        .then(() => res.json({ dragon }))
        .catch(error => next(error));
});

router.put('/update', (req, res, next) => {
    const { dragonId, nickname, isPublic, saleValue, sireValue } = req.body;
    console.log(`Updating dragon ${dragonId} with name ${nickname}...`)
    DragonTable.updateDragon({ dragonId, nickname, isPublic, saleValue, sireValue })
    .then(() => res.json({ message: 'Dragon has been updated.'}))
    .catch(error => next(error));
});

router.get('/public-dragons', (req, res, next) => {

    const sessionString = req.cookies.sessionString;
    authenticatedAccount({ sessionString })
    .then(({ account }) => {
        return DragonTable.getPublicDragons({ accountId: account.id });
    })
    .then((dragons) => {
        res.json(dragons);
    })
    .catch(error => next(error));
});

router.post('/buy', (req, res, next) => {
   const { dragonId, saleValue } = req.body;
   let buyerId;
   
   DragonTable.getDragon({ dragonId })
    .then(dragon => {
        if (dragon.saleValue !== saleValue) {
            throw new Error('Sale value provided is not correct.');
        };

        if (!dragon.isPublic) {
            throw new Error("Dragon is private (not for sale).")
        };

        return authenticatedAccount({ sessionString: req.cookies.sessionString });
    })
    .then(({ account, authenticated }) => {
        if (!authenticated) {
            throw new Error("Requesting user is not authenticated.")
        };

        if (saleValue > account.balance) {
            throw new Error("Sale value of dragon exceeds your account balance.")
        };

        buyerId = account.id;

        return AccountDragonTable.getDragonAccount({ dragonId });
    })
    .then(({ accountId }) => {
        if (accountId === buyerId) {
            throw new Error('You cannot buy your own dragon.');
        }

        const sellerId = accountId;

        return Promise.all([
            AccountTable.updateBalance({ accountId: buyerId, value: -saleValue }),
            AccountTable.updateBalance({ accountId: sellerId, value: saleValue }),
            AccountDragonTable.updateDragonAccount({ dragonId, accountId: buyerId }),
            DragonTable.updateDragon({ dragonId, isPublic: false })
        ])
    })
    .then(() => res.json({ message: "Dragon and Crowns have been transferred."}))
    .catch(error => next(error));
});

router.post('/mate', (req, res, next) => {
    const { motherDragonId, fatherDragonId } = req.body;
    if (motherDragonId === fatherDragonId ) {
        throw new Error("A Dragon cannot mate with itself.")
    }

    let motherDragon, motherAccountId;
    let fatherDragon, fatherAccountId;
    let newDragon;

    DragonTable.getDragon({ dragonId: fatherDragonId })
    .then(dragon => {
        if (!dragon.isPublic) {
            throw new Error("This Dragon is not available for siring.")
        }

        fatherDragon = dragon;
        return DragonTable.getDragon({ dragonId: motherDragonId })
    })
    .then(dragon => {
        motherDragon = dragon;
        return authenticatedAccount({ sessionString: req.cookies.sessionString })
    })
    .then(({ account, authenticated }) => {
        if (!authenticated) throw new Error("No authenticated session.");

        if (fatherDragon.sireValue > account.balance) {
            throw new Error("User does not have enough Crowns to complete this transaction.");
        }

        motherAccountId = account.id;
        return AccountDragonTable.getDragonAccount({ dragonId: fatherDragon.dragonId })
    })
    .then(({ accountId }) => {
        fatherAccountId = accountId;
        if (motherAccountId === fatherAccountId) {
            throw new Error("Cannot breed your own Dragons with one another.")
        }

        newDragon = Breeder.breedDragon({ mother: motherDragon, father: fatherDragon });

        return DragonTable.storeDragon(newDragon);
    })
    .then(({ dragonId }) => {
        newDragon.setDragonId(dragonId); 
        Promise.all([
            AccountTable.updateBalance({ accountId: motherAccountId, value: -fatherDragon.sireValue }),
            AccountTable.updateBalance({ accountId: fatherAccountId, value: fatherDragon.sireValue }),
            AccountDragonTable.storeAccountDragon({ dragonId, accountId: motherAccountId })
        ]);
    })
    .then(() => res.json({ message: "Mating transaction successful."}))
    .catch(error => next(error));
})

module.exports = router;