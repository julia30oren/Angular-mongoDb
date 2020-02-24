const express = require('express');
const router = express.Router();

router.get('/', async(req, res) => {
    res.send(`GET to-do`);
});

router.get('/:id', async(req, res) => {
    res.send(`GET by ID to-do`);
});

router.post('/new-task', async(req, res) => {
    console.log(req.body);
    res.send(`POST to-do`);
});

router.post('/task-done', async(req, res) => {
    console.log(req.body);
    res.send(`POST to-do done`);
});

router.delete('/delete-task', async(req, res) => {
    console.log(req.body);
    res.send(`DELETE to-do`);
})

module.exports = router;