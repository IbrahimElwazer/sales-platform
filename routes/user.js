const express = require('express');
const router = express.Router();
require('dotenv').config()
const jwt = require('jsonwebtoken');
const passport = require('passport');

router.post('/login', (req, res) => {

    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user){
            return res.status(400);
        } else {
            req.login(user, { session: false }, (err) => {
                if (err) {
                    res.send(err);
                }

                const token = jwt.sign(user, process.env.SECRET_KEY);
                return res.json({user, token});
            })
        }
    });
});

router.post('/signup', (req, res) => {

})