const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
var cors = require('cors');

function ifEnvVarieblesExist(params) {
    const missingPart = params.filter(param => !process.env[param]);
    if (missingPart.length > 0) {
        logger.error(`${missingPart} --is missing in .env`);
        console.log(`${missingPart} --is missing in .env`)
    } else return;
}
ifEnvVarieblesExist(["PORT", "HOST", "USER", "PASSWORD", "mongo_DATABASE", "mySgl_DATABASE", "DB_PORT"]);


mongoose.connect(process.env.mongo_DATABASE, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log(`DB conected to ${process.env.mongo_DATABASE}`)
});
const db = mongoose.connection;
db.on('error', (error) => { console.log('!!!!!! ', error) })
db.once('open', () => { console.log('Connected to DB') })

app.use(cors({ origin: 'http://localhost:4200' }));

app.use(express.json());
app.use('/user', require('./routes/user/user-rout'));
app.use('/admin', require('./routes/admins-rout'));
app.use('/productes', require('./routes/products/products-rout'));
app.use('/orders', require('./routes/orders-rout'));


app.listen(process.env.PORT, (res, err) => {
    if (err) {
        console.log(`Server is not runing : ${err}`)
    } else { console.log(`Server runing on PORT ${process.env.PORT}`) }
});