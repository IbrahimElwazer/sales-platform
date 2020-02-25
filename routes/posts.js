const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');

router.get('/', (req, res) => {
    Posts.findAll().then(posts => {
        res.json({posts})
    })
});

router.post('/', (req, res) => {

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

    Posts.create(postData).then(() => {
        res.send("post was successfully created!")
    }).catch(err => {
        res.send(err)
    });
});

module.exports = router;
