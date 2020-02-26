require('dotenv').config();
const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../middleware/passport');


router.get('/', (req, res) => {
    Posts.findAll().then(posts => {
        res.json({posts})
    })
});

router.get('/:id', (req, res) => {
    Posts.findOne({
        where: {
            ID: req.params.id
        }
    }).then(post => {
        if(post){
            res.json({post})
        } else{
            res.send("Post does not exist!")
        }
    }).catch(err => {
        res.json({err})
    } )
})

router.put('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
   
        Posts.update({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            city: req.body.city,
            country: req.body.country,
            images: req.body.images,
            price: req.body.price,
            deliveryType: req.body.deliveryType,
            sellerName: req.body.sellerName,
            mobile: req.body.mobile,
        }, {
            where: {
                ID: req.params.id
            }
        }).then(() => {
            res.send("Post has been successfully updated!")
        }).catch(err => {
            res.send(err)
        })
});

router.delete('/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
        Posts.destroy({
            where: {
                ID: req.params.id
            }
        }).then(() => {
            res.send("The post has been successfully deleted!")
        }).catch(err => {
            res.send(err)
        })
});

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    const postData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        city: req.body.city,
        country: req.body.country,
        images: req.body.images,
        price: req.body.price,
        postDate: Date.now(),
        deliveryType: req.body.deliveryType,
        sellerName: req.body.sellerName,
        mobile: req.body.mobile,
    }

    Posts.create(postData).then((post) => {
        res.json({
            Message: 'Post was successfully created!',
            Created: post.postDate
        })
    }).catch(err => {
        res.send(err)
    });
});


module.exports = router;
