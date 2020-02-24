const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`DB conected to ${process.env.DATABASE}`)
});
const db = mongoose.connect;


app.use(express.json());
app.use('/user', require('./routes/user/user-rout'));
app.use('/to-do-list', require('./routes/todo/todo-rout'));

app.listen(process.env.PORT, (res, err) => {
    if (err) {
        console.log(`Server is not runing : ${err}`)
    } else { console.log(`Server runing on PORT ${process.env.PORT}`) }
});