const express = require('express');
const router = express.Router();
const UsersSchema = require('./user/user-model');
/// MongoDB
const mongoose = require('mongoose');
/// MySql
const pool = require('../DB/pool');

///1user orders by id
router.get("/:id", async(req, res, next) => {
    try {
        const result = await pool.execute(get1UserOrders_Query(), [req.params.id]);
        const answer = result[0];
        console.log(answer);
        res.json(answer);
    } catch (err) {
        res.status(404).json({ message: `Not found : ${err.message}, ${err}` });
    }

});

router.post("/new_order/:id", getUsersById, async(req, res, next) => {
    const { address, card_number, exp_date, finale_price, comment, shipping_date } = req.body;
    let new_WL = { wl: res.thisUser.whish_list };
    try {
        const result = await pool.execute(putNewOrder_Query(), [req.params.id, res.thisUser.name, JSON.stringify(address), JSON.stringify(new_WL), card_number, exp_date, comment, finale_price, shipping_date]);
        if (result) {
            console.log(result);
            const cleanCart = await UsersSchema.update({ "_id": req.params.id }, { $set: { "whish_list": [] } });
            if (cleanCart) {
                res.status(200).json({ message: 'all done' });
            }
        } else res.status(304);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}, ${err}` });
    }

});

function get1UserOrders_Query() {
    return `SELECT * FROM shop_p.orders_table
            WHERE user_id = ?;`
}

function putNewOrder_Query() {
    return `INSERT INTO shop_p.orders_table ( user_id, user_name, order_address, __order__, card_N, exp_date, user_comment, finale_price, shipping_date )
            VALUES ( ?, ?, ?, ?, ?, ? , ?, ?, ?);`
}

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

module.exports = router;