const express = require('express');
const router = express.Router();

//Models
const Movie = require('../models/Movie');

/* ADD new  movie */
router.post('/', (req, res, next) => {
  //const {title, imdb_score, category, country, year}= req.body;

  const movie = new Movie(req.body);
  const promise = movie.save();

  promise.then( (data) => {
    res.json( {status : 1} )
  }).catch((err) => {
    res.json(err);
  });

});

/** all movies */
router.get('/', (req, res, next) => {
  const promise = Movie.find({ });
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/***/

module.exports = router;
