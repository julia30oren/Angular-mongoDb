const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');

mongoose.connect(process.env.DATABASE_LOCAL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`DB conected to ${process.env.DATABASE_LOCAL}`)
});
const db = mongoose.connection;
db.on('error', (error) => { console.log('!!!!!! ', error) })
db.once('open', () => { console.log('Connected to DB') })

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use('/Bank-Accounts', require('./routes/accounts/account-rout'));

app.listen(process.env.PORT, (res, err) => {
    if (err) {
        console.log(`Server is not runing : ${err}`)
    } else { console.log(`Server runing on PORT ${process.env.PORT}`) }
});