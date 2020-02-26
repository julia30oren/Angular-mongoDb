const express = require('express');
const router = express.Router();
const TaskSchema = require('./todo-model')

router.get('/', async(req, res) => {
    // res.json({ message: ` We have no error on server` })
    try {
        const allTasks = await TaskSchema.find();
        res.json(allTasks);
    } catch (err) {
        res.status(500).json({ message: ` We have an error on server : ${err.message}` })
    }
});

router.get('/:id', getTaskById, async(req, res) => {
    try {
        res.send(res.thisTodo)
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/new-task', async(req, res) => {

    const newTask = new TaskSchema({
        text: req.body.text,
        user_to_do: req.body.user_to_do,
    });

    try {
        const taskToSave = await newTask.save();
        res.status(201).json(taskToSave);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});


router.post('/task-done/:id', getTaskById, async(req, res) => {
    // res.send(`POST to-do done`);
    console.log(res.thisTodo)

    try {
        await res.thisTodo.updateOne({ $set: { "done": true } });
        res.json(res.thisTodo._id)
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.post('/delete-task/:id', getTaskById, async(req, res) => {
    // console.log(res.thisTodo)

    try {
        await res.thisTodo.remove();
        res.json({ message: `"${res.thisTodo.text}" task was deleted` })
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
})





async function getTaskById(req, res, next) {
    let thisTodo;
    try {
        thisTodo = await TaskSchema.findById(req.params.id);
        if (thisTodo == null) {
            return res.status(404).send({ message: 'user not found' })
        }
    } catch (err) {
        return res.status(500).send({ message: err.message })
    }
    res.thisTodo = thisTodo;
    next();
}





module.exports = router;