const express = require('express');
const router = express.Router();
const ProductSchema = require('./products-model')

router.get('/', async(req, res) => {
    try {
        const allProductes = await ProductSchema.find();
        res.json(allProductes);
    } catch (err) {
        res.status(500).json({ message: ` We have an error on server : ${err.message}` })
    }
});

router.get('/:id', getById, async(req, res) => {
    try {
        res.json([res.thisProduct])
    } catch (error) {
        res.status(400).json({ message: ` We have an error with data : ${err.message}` })
    }
});

router.get('/category/:name', getByName, async(req, res) => {
    // res.json(res.thisGroupe)
    try {
        res.json(res.thisGroupe)
    } catch (error) {
        res.status(400).json({ message: ` We have an error with data : ${err.message}` })
    }
});

router.post('/new-product', async(req, res) => {
    const newProduct = new ProductSchema({
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        image: req.body.image
    });

    try {
        const itemToSave = await newProduct.save();
        res.status(201).json(itemToSave);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with data : ${err.message}` })
    }
});

router.delete('/:id', getById, async(req, res) => {
    try {
        await res.thisProduct.remove();
        res.json({ message: `"${res.thisProduct.name}" item was deleted` })
    } catch (error) {
        res.status(400).json({ message: ` We have an error with delete : ${err.message}` })
    }
})





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