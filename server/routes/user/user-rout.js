const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.send(`GET user`);
});

router.get('/:id', async(req, res) => {
    res.send(`GET by ID user`);
});

router.post('/new-user', async(req, res) => {
    console.log(req.body);
    res.send(`POST user`);
});

router.post('/user-login', async(req, res) => {
    console.log(req.body);
    res.send(`POST user login`);
});

router.delete('/delete-user', async(req, res) => {
    console.log(req.body);
    res.send(`DELETE user`);
})

module.exports = router;