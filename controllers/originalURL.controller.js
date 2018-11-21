const ShortURL = require('../models/shortURL.model');
const dns = require('dns');
const url = require('url');

exports.evaluate_original_url = async function (req, res) {
    //check if the url form is valid, parses in hostname and checks if the hostname exists
    let url = req.body.url;
    if (!isUrlValid(url)) {
        console.log("invalid url");
        res.json({"error": "invalid url"});
        return
    }

    let hostname = new URL(url).hostname;
    
    try {
        let isDnsValid = await checkDns(hostname);
        if (!isDnsValid) {
            console.log("dead link");
            res.json({ "error": "the hostname cannot be resolved, check your url" });
            return
        }
    } catch (e) {
        console.log('error while evaluating url');
        return
    }
    

    //check is the submitted url is already in the database
    let isInputUrlKnown = "";
    try {
        isInputUrlKnown = await ShortURL.findOne({ 'original_URL': req.body.url }, handleURLsearch);
    } catch (e) {
        console.log('error while searching db');
        return
    }

    //if no match found, count documents to assign proper number to the new URL
    try {
        if (!isInputUrlKnown) {
            let count = await ShortURL.countDocuments(handleCount);
            create_and_display_new_url(req, res, count);
        }
        // retrieves url already shortened
        else {
            res.json({ 'original_url': req.body.url, 'short_url': isInputUrlKnown.short_URL });
            console.log("returning known url");
            return
        }
    } catch (e) {
        console.log('error while counting documents in db')
        return
    }
};

function handleURLsearch(err) {
    if (err) return console.error(err);
};

function handleCount(err, count) {
    if (err) return err;
}

function checkDns(domain) {
    return new Promise(resolve => {
        dns.resolve(domain, function (err) {
            if (err) {
                console.log(err.code);
                resolve (false);
            }
            else {
            resolve (true);
            }
        });
    });
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

function isUrlValid(url){
    let regexp = /^https?:\/\//;
    let result = regexp.test(url);
    console.log(result)
    return result;
};
