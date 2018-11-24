const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
    director_id : Schema.Types.ObjectId,
    title : {
        type : String,
        required : [true, '`{PATH}` alani zorunludur.'],
        maxlength : [60, '`{PATH}` alani (`{MAXLENGTH}`)  karakterden buyuk olamaz.'],
        minlength : [5, '`{PATH}` alani (`{MINLENGTH}`) karakterden kucuk olamaz.']
    },
    category : {
        type : String,
        maxlength: 30,
        minlength: 2
    },
    country : {
        type : String,
        maxlength : 30,
        minlength : 2
    },
    year : {
        type : Number,
        maxlength : 2025,
        minlength : 1900
    },
    imdb_score : Number,
    createdAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('movie', MovieSchema);