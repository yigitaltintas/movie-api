const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
   name : {
       type : String,
       required : true,
       maxlength : 60,
       minlength : 2
   },
   surname : String,
   bio : String,
   createdAt : {
       type : Date,
       default : Date.now()
   }
});

module.exports = mongoose.model('director', DirectorSchema);