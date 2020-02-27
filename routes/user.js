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
            res.send("This account already exists!")
        } else {
        if ( 'username' in req.body == false || 'password' in req.body == false) {
            res.send("Failed to register, username and password must be given!")
         } else{
           bcyrpt.hash(req.body.password, 12, (err, hash) => {
               userData.password = hash
               User.create(userData).then(user => {
                   res.send(user.username + " was successfully created!")
               }).catch(error => {
                   res.send(error)
               })
           })
         }
      }
    }).catch(err => res.send(err));
});



router.post('/login', (req, res) => {
    
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user){
            bcyrpt.compare(req.body.password, user.password).then(password => {
                if(password){
                    jwt.sign(user.username, process.env.TOP_SECRET, (err, token) => {
                        if(err) { console.log(err) }    
                        res.json({Token: token});
                    });
                } else{
                    res.send("Incorrect password entered!")
                }
             })    
            } else{
                res.send("Incorrect username entered!")
            }
        }
    )
});

module.exports = router;