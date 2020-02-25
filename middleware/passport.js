require('dotenv').config();
const bcrypt = require('bcrypt');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use('register', new localStrategy(
    { session: false }, (username, password, done) => {
        User.findOne({
            where: {
                username: username
            }
        }).then(user => {
            if (!user){
                bcrypt.hash(password, 12).then(hashedPassword => {
                    User.create({username, password: hashedPassword}).then(user => {
                        return done(null, user);
                    });
                });
            } else {
                return done(null, false, { message: "This username is already taken"});
            }
        });
    } 
));


passport.use('login', new localStrategy((username, password, done) => {
    User.findOne({
        username: username
    }).then(user => {
        if (user){
            bcrypt.compare(password, user.password).then(response => {
                if (response){
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Incorrect password entered"})
                }
            })
        } else {
            return done(null, false, {message: "No account with such username"})
        }
    });
}));

const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: process.env.TOP_SECRET
}

passport.use('jwt', new JWTStrategy(options, (jwt_payload, done) => {
    User.findOne({
        where: {
            username: jwt_payload.id
        }
    }).then(user => {
        if (user){
             done(null, user);
        } else{
             done(null, false);
        }
    });
}));

module.exports = router;