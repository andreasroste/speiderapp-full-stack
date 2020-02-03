// Kategori modell

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var kategoriSchema = new Schema({
    title: String,
    caption: String,
    posts: []
});

module.exports = mongoose.model('Kategori', kategoriSchema);