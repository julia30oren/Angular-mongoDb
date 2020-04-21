const express = require('express');
const router = express.Router();
const UsersSchema = require('./user-model');
const ProductSchema = require('../products/products-model');
const mongoose = require('mongoose');
const pool = require('../../DB/pool');
const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');

router.get('/:id', getUsersById, async(req, res) => {
    try {
        res.status(302).json({ name: res.thisUser.name, _id: res.thisUser._id, whish_list: res.thisUser.whish_list })
    } catch (error) {
        res.status(404).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.get('/cart/:id', getUsersById, async(req, res) => {
    try {
        res.json(res.thisUser.whish_list)
    } catch (error) {
        res.status(404).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.get('/address/:id', getUsersById, async(req, res) => {
    try {
        res.json(res.thisUser.adress);
    } catch (error) {
        res.status(404).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/new-user', async(req, res) => {
    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new UsersSchema({
        name: req.body.first_name + ' ' + req.body.last_name,
        passportN: req.body.PN,
        email: req.body.email,
        password: passwordHash,
        adress: [{
            city: req.body.city,
            street: req.body.street,
            house: req.body.house,
            apartments: req.body.apartments,
            phone_num: req.body.phone_num
        }]
    });
    console.log(newUser);

    try {
        const ifUserExist = await UsersSchema.find({ $or: [{ "passportN": req.body.PN }, { "email": req.body.email }] });
        if (ifUserExist[0]) {
            res.status(302).json({ status: 5 })
        } else {
            const userToSave = await newUser.save();
            if (userToSave) {
                res.status(201).json({ status: 6, name: userToSave.name });
            }
        }
    } catch (err) {
        console.log(err.message)
        res.status(404).json({ message: err.message })
    }
});

router.post('/user-login', async(req, res) => {
    const { email, password } = req.body;
    if (email === 'admin') {
        const result = await pool.execute(adminCheck_Query(), [email, password]);
        const exist = result[0];
        if (exist) {
            const adminToken = JWT.sign({ email }, process.env.ADMIN_SECRET, { expiresIn: '12h' });
            res.status(200).json({ status: 4, token: adminToken })
        }
    } else {
        try {
            const loginU = await UsersSchema.find({ "email": email });
            const User = loginU[0];
            if (User) {
                const hush = User.password;
                const cryptoPassChek = bcrypt.compareSync(password, hush);
                if (cryptoPassChek) {
                    const userToken = JWT.sign({ email }, process.env.SECRET, { expiresIn: '2h' });
                    res.status(202).json({ status: 3, token: userToken, name: User.name, _id: User._id, whish_list: User.whish_list });
                } else res.status(304).json({ status: 2 });
            } else res.status(404).json({ status: 1 });
        } catch (err) {
            console.log(err.message)
            return res.status(500).send({ message: err.message })
        }
    }
});

router.post('/password-change', async(req, res) => {
    const { email, oldPass, password } = req.body;

    try {
        const loginU = await UsersSchema.find({ "email": email });
        console.log(loginU)
        const User = loginU[0];
        const hush = User.password;
        const cryptoPassChek = bcrypt.compareSync(oldPass, hush);
        if (cryptoPassChek) {
            const salt = bcrypt.genSaltSync(10);
            const passwordHash = bcrypt.hashSync(password, salt);
            console.log(passwordHash)
            const passChange = await UsersSchema.update({ "email": email }, { $set: { "password": passwordHash } });
            console.log(passChange)
            if (passChange.nModified === 1) {
                res.status(200).json({ status: 5, message: 'success' })
            } else {
                res.status(304).json({ status: 6 })
            }
        } else res.status(304).send({ status: 7 })
    } catch (err) {
        return res.status(404).send({ message: err.message, status: 8 })
    }
});

///add to cart +1 or new
router.post('/cart-add', async(req, res) => {
    const { user_id, item_id } = req.body;
    try {
        /// if item olready exist in users cart:
        const searchItem_inUser = await UsersSchema.find({ "_id": user_id, "whish_list.item_id": item_id });
        /// if EXIST
        if (searchItem_inUser[0]) {
            const thisProduct = searchItem_inUser[0].whish_list.filter(item => item.item_id === item_id);
            const newAmount = thisProduct[0].amount + 1;
            const addItem_toCart = await UsersSchema.update({ "_id": user_id, "whish_list.item_id": item_id }, { $set: { "whish_list.$.amount": newAmount } });
            res.status(200).json({ message: `Item was addet to cart successfully. ${thisProduct[0].name} total amount: ${newAmount}`, item: thisProduct, amount: newAmount })
        } else {
            /// if  NOT EXIST
            const searchItem = await ProductSchema.findById(item_id);
            const newItem = {
                item_id: searchItem._id,
                image: searchItem.image,
                name: searchItem.name,
                for_quantity: searchItem.for_quantity,
                for_measure: searchItem.for_measure,
                category: searchItem.category,
                price: searchItem.price,
                amount: 1
            };
            const addItem_toCart = await UsersSchema.updateOne({ "_id": user_id }, { $push: { "whish_list": newItem } });
            res.status(200).json({ message: `Item was addet to cart successfully.`, item: newItem, amount: 1 });
        }
    } catch (err) {
        return res.status(400).send({ message: err.message })
    }
});

//remove one -1 or item
router.post('/cart-remove', async(req, res) => {
    const { user_id, item_id } = req.body;
    try {
        const searchItem = await UsersSchema.find({ "_id": user_id, "whish_list.item_id": item_id });
        if (searchItem[0]) {
            const thisItem = searchItem[0].whish_list.filter(item => item.item_id === item_id);
            if (thisItem[0].amount > 1) {
                const newAmount = thisItem[0].amount - 1;
                const removeItem_fromCart = await UsersSchema.update({ "_id": user_id, "whish_list.item_id": item_id }, { $set: { "whish_list.$.amount": newAmount } });
                res.status(200).json({ message: `1 ${thisItem[0].name} was removed from cart successfully. Now ${newAmount}` });
            } else {
                const remove1Item_fromCart = await UsersSchema.update({ "_id": user_id }, { $pull: { "whish_list": { "item_id": item_id } } });
                res.status(200).json({ message: `Item ${thisItem[0].name} was removed from cart successfully.` })
            }
        } else {
            return res.status(404).send('no such product')
        }
    } catch (err) {
        return res.status(404).send({ message: err.message })
    }
});

router.post('/cart-removeItem', async(req, res) => {
    const { user_id, item_id } = req.body;
    try {
        const searchItem = await UsersSchema.find({ "_id": user_id, "whish_list.item_id": item_id });
        if (searchItem[0]) {
            const thisItem = searchItem[0].whish_list.filter(item => item.item_id === item_id);
            const remove1Item_fromCart = await UsersSchema.update({ "_id": user_id }, { $pull: { "whish_list": { "item_id": item_id } } });
            res.status(200).json({ message: `Item ${thisItem[0].name} was removed from cart successfully.` })
        } else {
            return res.status(404).send('no such product')
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});


router.get('/delete-WL/:id', async(req, res) => {
    try {
        const cleanCart = await UsersSchema.update({ "_id": req.params.id }, { $set: { "whish_list": [] } });
        res.status(200).send({ message: `cart was deleted` })
    } catch (error) {
        res.status(404).json({ message: ` We have an error with users data : ${err.message}` })
    }
});


async function getUsersById(req, res, next) {
    let thisUser;
    try {
        thisUser = await UsersSchema.findById(req.params.id);
        if (thisUser == null) {
            return res.status(404).send({ message: 'user not found' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.thisUser = thisUser;
    next();
}

function adminCheck_Query() {
    return `SELECT * FROM shop_p.admins
            WHERE name_admin = ?
            AND pessword_admin= ?;`
}

module.exports = router;