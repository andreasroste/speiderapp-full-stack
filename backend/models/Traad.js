// Tråd modell

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var traadSchema = new Schema({
    date: {type: Date, default: Date.now},
    author: {type: String, default: 'Anonym'},
    author_no: String,
    title: String,
    content: String,
    category: String
});

module.exports = mongoose.model('Traad', traadSchema);