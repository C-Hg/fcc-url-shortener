

exports.send_short_url = function (req, res) {
    res.json({original_url: req.body.url, short_url: "surprise"});
};