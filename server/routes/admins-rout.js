const express = require('express');
const router = express.Router();
const ProductSchema = require('./products/products-model');
/// MySql
const pool = require('../DB/pool');


///all orders
router.get('/orders', async(req, res) => {
    try {
        const result = await pool.execute(getOrders_Query());
        const answer = result[0];
        res.send(answer);
    } catch (err) {
        res.status(500).json({ message: ` We have an error on server : ${err.message}` })
    }
});


////change 1 product and find by id
router.post("/change/:id", async(req, res, next) => {
    const { name, category, price, for_quantity, for_measure, image } = req.body;

    try {
        const itemToChange = await ProductSchema.updateOne({ "_id": req.params.id }, { $set: { "name": name, "category": category, "price": price, "for_quantity": for_quantity, "for_measure": for_measure, "image": image } });
        if (itemToChange.ok) {
            // console.log(itemToChange);
            res.status(201).json({ message: `Product "${name}" was changed successfully.` });
        } else {
            res.status(400).json({ message: ` We have an error .` })
        }
    } catch (err) {
        res.status(400).json({ message: ` We have an error with data : ${err.message}` })
    }

});

////create new product
router.post("/new-producte", async(req, res, next) => {
    const newProduct = new ProductSchema({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        for_quantity: req.body.for_quantity,
        for_measure: req.body.for_measure,
        image: req.body.image
    });
    try {
        const itemToSave = await newProduct.save();
        if (itemToSave._id) {
            // console.log(itemToSave._id);
            res.status(201).json({ _id: itemToSave._id, message: `Product "${itemToSave.name}" was added successfully.` });
        } else {
            res.status(400).json({ message: ` We have an error .` })
        }
    } catch (err) {
        res.status(400).json({ message: ` We have an error with data : ${err.message}` })
    }
});

////change state of order
router.get("/order-st/:id", async(req, res, next) => {
    try {
        const result = await pool.execute(changeState_Query(), [req.params.id]);
        console.log(result);
        res.send(result);
    } catch (err) {
        res.status(400).json({ message: ` We have an error: ${err.message}` })
    }

});


function getOrders_Query() {
    return `SELECT * FROM shop_p.orders_table;`
}

function changeState_Query() {
    return `UPDATE shop_p.orders_table
            SET done = true
            WHERE order_id = ?;`
}

module.exports = router;

///delete product by ID
// router.delete('/:id', getById, async(req, res) => {
//     try {
//         await res.thisProduct.remove();
//         res.json({ message: `"${res.thisProduct.name}" item was deleted` })
//     } catch (error) {
//         res.status(400).json({ message: ` We have an error with delete : ${err.message}` })
//     }
// })