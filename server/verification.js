const express = require('express');
const router = express.Router();
const JWT = require('jsonwebtoken');
// const logger = require("../utils/logger");

router.post("/", async(req, res, next) => {
    const { token, user } = req.body;
    try {
        if (user === 'admin') {
            var decoded = JWT.verify(JSON.parse(token), process.env.ADMIN_SECRET);
            if (decoded) {
                res.json({ responce: true });
            }
        } else {
            var decoded = JWT.verify(token, process.env.SECRET);
            if (decoded) {
                res.json({ response: true });
            }
        }

    } catch (err) {
        if (err) {
            console.log(err.message);
            res.json({ responce: false, message: err.message });
        }
    }
})

module.exports = router;