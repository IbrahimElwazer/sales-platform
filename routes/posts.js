require('dotenv').config();
const express = require('express');
const router = express.Router();
const Posts = require('../models/posts');
const passport = require('passport');
require('../middleware/passport');
const multer = require('multer');


const upload = multer({
    storage: multer.diskStorage({
        destination: 'public/images/',
        filename: function(req, file, cb){
            cb(null, file.originalname);
        }
    })
}).array('images', 4);


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


router.get('/categories/:category', (req, res) => {
    Posts.findAll({
        where: {
            category: req.params.category
        }
    }).then(posts => {
        if(posts) {
            res.json({posts})
        } else{
            res.send("No posts with such a category exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})

router.get('/cities/:city', (req, res) => {
    Posts.findAll({
        where: {
            city: req.params.city
        }
    }).then(posts => {
        if(posts) {
            res.json({posts})
        } else{
            res.send("No posts from this city exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})

router.get('/countries/:country', (req, res) => {
    Posts.findAll({
        where: {
            country: req.params.country
        }
    }).then(posts => {
        if(posts) {
            res.json({posts})
        } else{
            res.send("No posts from this country exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})

router.get('/dates/:date', (req, res) => {
    Posts.findAll({
        where:{
            postDate: req.params.date
        }
    }).then(posts => {
        if(posts) {
            res.json({posts})
        } else{
            res.send("No posts from this date exist!")
        }
    }).catch(err => {
        res.send(err)
    })
})


router.put('/:id', upload, passport.authenticate('jwt', {session: false}), (req, res) => {
   
        Posts.update({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            city: req.body.city,
            country: req.body.country,
            images: req.files.originalname,
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


router.post('/',  upload, passport.authenticate('jwt', {session: false}), (req, res) => {
    

    const postData = {
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        city: req.body.city,
        country: req.body.country,
        images: `${req.files.map(file => file.originalname)}`,
        price: req.body.price,
        postDate: Date.now(),
        deliveryType: req.body.deliveryType,
        sellerName: req.body.sellerName,
        mobile: req.body.mobile,
    }
    Posts.create(postData).then((post) => {
        res.send("Your post was successfully created! Created at: " + post.images)        
    }).catch(err => {
        res.send(err)
    });
});


module.exports = router;
