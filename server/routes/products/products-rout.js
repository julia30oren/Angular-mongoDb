const express = require('express');
const router = express.Router();
const ProductSchema = require('./products-model')

router.get('/', async(req, res) => {
    try {
        const allProductes = await ProductSchema.find();
        res.json(allProductes);
    } catch (err) {
        res.status(404).json({ message: ` We have an error on server : ${err.message}` })
    }
});

router.get('/:id', getById, async(req, res) => {
    try {
        res.status(302).json([res.thisProduct])
    } catch (error) {
        res.status(404).json({ message: ` We have an error with data : ${err.message}` })
    }
});

router.get('/category/:name', getByName, async(req, res) => {
    // res.json(res.thisGroupe)
    try {
        res.status(302).json(res.thisGroupe)
    } catch (error) {
        res.status(404).json({ message: ` We have an error with data : ${err.message}` })
    }
});


async function getById(req, res, next) {
    let thisProduct;
    try {
        thisProduct = await ProductSchema.findById(req.params.id);
        if (thisProduct == null) {
            return res.status(404).send({ message: 'item not found' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.thisProduct = thisProduct;
    next();
}


async function getByName(req, res, next) {
    let thisGroupe;
    try {
        thisGroupe = await ProductSchema.find({ "category": req.params.name });
        if (thisGroupe == null) {
            return res.status(404).send({ message: 'category not found' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.thisGroupe = thisGroupe;
    next();
}

module.exports = router;