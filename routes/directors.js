const mongoose = require('mongoose');
const express = require('express');
const router  = express.Router();

// Models
const Director = require('../models/Director');

/** Add new director */
router.post('/', (req, res) => {
    const director = new Director(req.body);
    const promise = director.save();

    promise.then(director => {
        res.json(director);
    }).catch(err => {
        res.json(err);
    })
});

/** Get Directors */
router.get('/', (req, res) => {
   const director = Director.aggregate([
       {
           $lookup : {
               from : 'movies',
               localField: '_id',
               foreignField : 'director_id',
               as : 'movies'
           }
       },
       {
           $unwind: {
               path : '$movies',
               preserveNullAndEmptyArrays : true
           }
       },
       {
           $group: {
               _id : {
                   _id : '$_id',
                   name : '$name',
                   surname : '$surname',
                   bio : '$bio'
               },
               movies : {
                   $push : '$movies'
               }
           }
       },
       {
           $project : {
               _id : '$_id._id',
               name : '$_id.name',
               surname : '$_id.surname',
               movies : '$movies'
           }
       }
   ]);

   director.then( data => {
       res.json(data);
   }).catch( err => {
       res.json(err);
   })
});

/** Get One Director */
router.get('/:director_id', (req, res) => {
    const director = Director.aggregate([
        {
          $match : {
              '_id' : mongoose.Types.ObjectId(req.params.director_id)
          }
        },
        {
            $lookup : {
                from : 'movies',
                localField: '_id',
                foreignField : 'director_id',
                as : 'movies'
            }
        },
        {
            $unwind: {
                path : '$movies',
                preserveNullAndEmptyArrays : true
            }
        },
        {
            $group: {
                _id : {
                    _id : '$_id',
                    name : '$name',
                    surname : '$surname',
                    bio : '$bio'
                },
                movies : {
                    $push : '$movies'
                }
            }
        },
        {
            $project : {
                _id : '$_id._id',
                name : '$_id.name',
                surname : '$_id.surname',
                movies : '$movies'
            }
        }
    ]);

    director.then( data => {
        res.json(data);
    }).catch( err => {
        res.json(err);
    })
});

/** Update Director */
router.put('/:director_id' , (req, res, next) => {
   const director = Director.findByIdAndUpdate(
       req.params.director_id,
       req.body,
       {
           new : true
       }
   );

   director.then(data => {
       if(!data)
           return next({ message : "The director was not found" , code : 2});
       res.json(data);
   }).catch(err => {
       res.json(err);
   });

});

/** Delete Director */
router.delete('/:director_id', (req, res, next) => {
    const director = Director.findByIdAndRemove(req.params.director_id);

    director.then( data => {
       if(!data)
           return next( { message : "The director was not found" , code : 2} );

       res.json( { status : 1} );

    }).catch( err => {
        res.json(err);
    });
});


module.exports = router;