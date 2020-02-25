const express = require('express');
const router = express.Router();
const UsersSchema = require('./user-model');

router.get('/', async(req, res) => {
    try {
        const allUsers = await UsersSchema.find()
        res.send(allUsers)
    } catch (err) {
        res.status(500).json({ message: ` We have an error on server : ${err.message}` })
    }
});

router.get('/:id', getUsersById, async(req, res) => {
    try {
        res.send(res.thisUser)
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/new-user', async(req, res) => {
    // console.log(req.body);
    // res.send(`POST user`);
    const newUser = new UsersSchema({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    // console.log(newUser)
    try {
        const userToSave = await newUser.save()
        res.status(201).json(userToSave);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/user-login', async(req, res) => {
    // console.logs(req.body);
    // res.send(`POST user login`);

    const { email, password } = req.body;
    try {
        const login = await UsersSchema.find({ "email": email, "password": password });
        res.json(login);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.delete('/delete-user', async(req, res) => {
    const { email } = req.body;
    try {
        const deleteUser = await UsersSchema.remove({ "email": email });
        res.json({ message: `user deleted` })
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.delete('/delete-user/:id', getUsersById, async(req, res) => {
    try {
        await res.thisUser.remove();
        res.send({ message: `user deleted ${res.thisUser.name}` })
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
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

module.exports = router;