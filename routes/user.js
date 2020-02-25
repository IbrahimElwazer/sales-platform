require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcyrpt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');


router.post('/register', (req, res) => {
    const userData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: req.body.password
    }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (user) {
            res.send("this account already exists")
        } else {
           bcyrpt.hash(req.body.password, 12, (err, hash) => {
               userData.password = hash
               User.create(userData).then(user => {
                   res.send(user.username + " was successfully created!")
               }).catch(error => {
                   res.send(error)
               })
           })
        }
    }).catch(err => res.send(err));
});


router.post('/login', (req, res) => {
    // const options = {
    //     expiresIn: 1440
    // }
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user){
            bcyrpt.compare(req.body.password, user.password).then(password => {
                if(password){
                    let token = jwt.sign(user.username, process.env.TOKEN_SECRET);
                    res.send("Your token: " + token)
                } else{
                    res.send("Incorrect password entered!")
                }
             })    
            } else{
                res.send("Incorrect username enetered!")
            }
        }
    )
});

module.exports = router;