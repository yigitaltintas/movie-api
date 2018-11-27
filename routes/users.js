const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// Models

const User = require('../models/User');

router.post('/register', (req, res, next) => {
    const {username, password} = req.body;

    bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
            username,
            password : hash
        });

        const promise = user.save();

        promise.then(data => {
            res.json( data );
        }).catch( err => {
            res.json(err);
        });
    });

});

router.post('/auth' , (req, res, next) => {
   const {username, password} = req.body;

   User.findOne({ username }, (err, user) => {
       if(err)
           throw err;

       if(!user)
           return next( { message : 'User not found' } );

       bcrypt.compare(password, user.password).then(result => {
          if(!result)
              return next( { message : 'Wrong password'} );

          const payload  = {
              username
          };
          const token = jwt.sign(payload, req.app.get('api_secret_key'), {expiresIn: 720 });

          res.json({
              status : true,
              token
          });

       });
   });
});


module.exports = router;