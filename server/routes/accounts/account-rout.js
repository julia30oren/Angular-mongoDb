const express = require('express');
const router = express.Router();
const AccountSchema = require('./account-model');

router.get('/', async(req, res) => {
    try {
        const allAccounts = await AccountSchema.find()
        res.send(allAccounts)
    } catch (err) {
        res.status(500).json({ message: ` We have an error on server : ${err.message}` })
    }
});

router.post('/account', async(req, res) => {
    // console.log(req.body.account_number)

    try {
        const thisNumber_Accounts = await AccountSchema.find({ "acount_number": req.body.account_number })
        res.json(thisNumber_Accounts)
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/new', async(req, res) => {
    console.log('///', req.body);
    // res.send(`POST user`);
    const newRequest = new AccountSchema({
        acount_number: req.body.acount_number,
        action_tipe: [{
            tittle: req.body.action_tipe.tittle,
            amount: req.body.action_tipe.amount,
            procent: req.body.action_tipe.procent,
            paiements: req.body.action_tipe.paiements,
            end_date: req.body.action_tipe.end_date
        }]
    });
    try {
        const requestToSave = await newRequest.save()
        res.status(201).json(requestToSave);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

module.exports = router;