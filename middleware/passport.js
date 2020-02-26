require('dotenv').config();
const express = require('express');
const router = express.Router();
const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;


const options = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.TOP_SECRET
}

passport.use('jwt', new JWTStrategy(options, (jwt_payload, done) => {
    
    done(null, jwt_payload);

}));

module.exports = router;