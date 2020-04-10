const mysql_2 = require('mysql2');
const { DB_PORT, HOST, USER, PASSWORD, mySgl_DATABASE } = process.env;

const pool = mysql_2.createPool({
    host: HOST,
    port: DB_PORT,
    user: USER,
    password: PASSWORD,
    database: mySgl_DATABASE,
    //
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

module.exports = pool.promise();