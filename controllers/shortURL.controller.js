const ShortURL = require('../models/shortURL.model');

exports.evaluate_original_url = async function (req, res) {
    let input_url = await ShortURL.findOne({ 'original_URL': req.body.url }, handleURLsearch);

    //if no match found, count documents to assign proper number to the new URL
    if (!input_url) {
        let count = await ShortURL.countDocuments(handleCount);
        create_and_display_new_url(req, res, count);
    }

    // retrieves url already shortened
    else {
        res.json({ 'original_url': req.body.url, 'short_url': input_url.short_URL });
    }
};

async function handleURLsearch(err, url_details) {
    if (err) return console.error(err);
    return url_details;
};

function handleCount(err, count) {
    if (err) return err;
    return count;
}

create_and_display_new_url = function (req, res, count) {
    let newUrl = new ShortURL({
        'original_URL': req.body.url,
        'short_URL': count + 1
    });
    newUrl.save(function (err) {
        if (err) { return handleError(err); }
        res.json({ 'original_url': req.body.url, 'short_url': newUrl.short_URL });
        console.log("New short URL added to database");
    })
};