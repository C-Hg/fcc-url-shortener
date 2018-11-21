const ShortURL = require('../models/shortURL.model');

exports.evaluate_short_url = async function (req, res) {
    //check if the url is in the db
    let isInputUrlKnown = "";
    try {
        isInputUrlKnown = await ShortURL.findOne({ 'short_URL': req.params.short_url }, handleURLsearch);
    } catch (e) {
        console.log('error while searching db');
        return
    }
    
    //returns error if not, else redirects
    if (isInputUrlKnown) {
        res.redirect(isInputUrlKnown.original_URL);        
    }
    else {
        res.json({"error":"this id does not exist in the database"});
        return
    }
};


function handleURLsearch(err) {
    if (err) return console.error(err);
};