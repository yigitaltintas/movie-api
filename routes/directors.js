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

module.exports = router;