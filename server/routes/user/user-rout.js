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
    const newUser = new UsersSchema({
        name: req.body.first_name + ' ' + req.body.last_name,
        id: req.body.id,
        email: req.body.email,
        password: req.body.password,
        adress: [{
            city: req.body.city,
            street: req.body.street,
            house: req.body.house,
            apartments: req.body.apartments,
            phone_num: req.body.phone_num
        }]
    });
    // console.log(newUser);
    try {
        const userToSave = await newUser.save();
        res.json(` User ${userToSave.name} signed up successfully.`);
    } catch (err) {
        res.status(400).json(` We have an error with users data.`)
    }
});

router.post('/user-login', async(req, res) => {
    const { email, password } = req.body;
    try {
        const login = await UsersSchema.find({ "email": email, "password": password });
        res.json(login[0].name);
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

router.post('/password-change', async(req, res) => {
    const { email, oldPass, password } = req.body;
    try {
        const passChange = await UsersSchema.update({ "email": email, "password": oldPass }, { $set: { "password": password } });
        if (passChange.nModified === 1) { res.json(`Password was changed successfully.`) } else { res.json(`Password wasn't changed.`) }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
});

// router.post('/delete-user', async(req, res) => {
//     const { email } = req.body;
//     try {
//         const deleteUser = await UsersSchema.remove({ "email": email });
//         res.json({ message: `user deleted` })
//     } catch (err) {
//         return res.status(500).send({ message: err.message })
//     }
// });

// router.post('/delete-user/:id', getUsersById, async(req, res) => {
//     try {
//         await res.thisUser.remove();
//         res.send({ message: `user deleted ${res.thisUser.name}` })
//     } catch (error) {
//         res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
//     }
// });


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