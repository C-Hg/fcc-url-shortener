var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShortURLSchema = new Schema({
    'original_URL': String,
    'short_URL': Number
});

module.exports = mongoose.model('ShortURL', ShortURLSchema);