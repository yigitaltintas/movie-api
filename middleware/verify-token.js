const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['x-access-token'] || req.body.token || req.query.token;

    if(!token)
        return next( {message : 'Token not found'} );

    jwt.verify(token, req.app.get('api_secret_key'), (err, decoded) => {
        if(err){
            return next({message: 'Failed to auth token.'});
        }else{
            req.decode = decoded;
            next();
        }
    });
};