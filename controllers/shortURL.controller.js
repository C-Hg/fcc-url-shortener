const ShortURL = require('../models/shortURL.model');

exports.send_short_url = function (req, res) {
    res.json({ original_url: req.body.url, short_url: "surprise", total_url: ShortURL.collection.countDocuments() });
};


exports.search_original_url = function (req, res) {
    ShortURL.findOne({ 'original_URL': req.body.url }, function (err, url_details) {
        if (err) return next(err);
        //create the new entry if not already in the database (url_detail returns NULL if no match)

        if (!url_details) {
            let totalURLs = 0;

            const retrieveNumberOfDocuments = async () => {
                await ShortURL.countDocuments(function (err, count){
                    if (err) return err;
                    let url = new ShortURL({
                        'original_URL': req.body.url,
                        'short_URL': count + 1
                    });
                    url.save(function (err) {
                        if (err) {return (err); }
                        res.json({ 'original_URL': req.body.url, 'short_URL': url.short_URL });
                        console.log("New short URL added to database");
                    })               
                });
            }
            retrieveNumberOfDocuments();        
        }
        // retrieves url already shortened
        else {
            res.json({ 'original_url': req.body.url, 'short_url': url_details.short_URL });
        }
    })
};

exports.create_new_url = function (req, res) {
    let url = new ShortURL({
        'original_url': req.body.url,
        'short_url': 1
    });
    url.save(function (err) {
        if (err) { return handleError(err); }
        res.json({ 'original_url': req.body.url, 'short_url': url.short_URL });
        console.log("New short URL added to database");
    })
};