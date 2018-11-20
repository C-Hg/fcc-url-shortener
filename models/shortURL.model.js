var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var shortURLSchema = new Schema({
    original_URL: String,
    short_URL: Number
});

module.exports = mongoose.model('ShortURL', ShortURLSchema);

/*
function getURLQuery(url){
    var query = ShortURLModel.find({target_URL: url});
    return query
} 

ShortURLModel.create({target_URL: url, id: id}, function(err) {
    if (err) return handleError(err);
});

module.exports = {
    ShortURLModel: ShortURLModel,
    getURLQuery: getURLQuery
};
*/
