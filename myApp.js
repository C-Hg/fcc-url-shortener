var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//serving public files
app.use(express.static('public'));

//setting up bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//url-shortener endpoint
app.post("/api/shorturl/new", function(req, res) {
  res.json({original_url: req.body.url});
});

//home routing
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });


module.exports = app;