const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://mongo_user:Mongo1234@ds029635.mlab.com:29635/movie-api', {  useNewUrlParser: true });
  mongoose.set('useCreateIndex', true);
  mongoose.set('useFindAndModify', false);
  mongoose.connection.on('open', () => {
     //console.log('MongoDB: Connected');
  });

  mongoose.connection.on('error', (err) => {
     console.log(err.errmsg);
  });

  mongoose.Promise = global.Promise;
};