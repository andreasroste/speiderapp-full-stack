// Kommentar modell

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var kommentarSchema = new Schema({
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonym'},
    author_no: String,
    content: String,
    post: String
});

module.exports = mongoose.model('Kommentar', kommentarSchema);