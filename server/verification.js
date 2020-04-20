const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
const logger = require("./logger");

let time = Date.now();
let now = new Date(time)

router.post("/", async(req, res, next) => {
    const { token, user } = req.body;
    try {
        if (user === 'admin') {
            var decoded = JWT.verify(JSON.parse(token), process.env.ADMIN_SECRET);
            if (decoded) {
                res.json({ responce: true });
                logger.info(`${now} -  Admin loged in`);
            } else logger.error(`${now} - Admin error`);
        } else {
            var decoded = JWT.verify(token, process.env.SECRET);
            if (decoded) {
                res.json({ response: true });
            }
        }

    } catch (err) {
        if (err) {
            logger.error(`${now} - verification error`);
            res.json({ responce: false, message: err.message });
        }
    }
})

module.exports = router;