const express = require('express');
const router = express.Router();
const TaskSchema = require('./todo-model')

router.get('/', async(req, res) => {
    try {
        const allTasks = await TaskSchema.find()
        res.send(allTasks)
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
    // console.log(req.body);

    const newTask = new TaskSchema({
        text: req.body.text,
        user_to_do: req.body.user_to_do,
        done: req.body.done
    });
    // console.log(newUser)
    try {
        const taskToSave = await newTask.save()
        res.status(201).json(taskToSave);
    } catch (err) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});


router.post('/task-done/:id', getTaskById, async(req, res) => {
    // res.send(`POST to-do done`);
    try {
        await res.thisTodo.updateOne({ $set: { "done": true } });
        res.send({ message: `"${res.thisTodo.text}" task is done ` })
    } catch (error) {
        res.status(400).json({ message: ` We have an error with users data : ${err.message}` })
    }
});

router.delete('/delete-task/:id', getTaskById, async(req, res) => {
    try {
        await res.thisTodo.remove();
        res.send({ message: `"${res.thisTodo.text}" task was deleted` })
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