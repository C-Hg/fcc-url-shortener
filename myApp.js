var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//importing models
var ShortURLModel = require('./database/models').ShortURLModel;
var getURLQuery = require('./database/models').getURLQuery;

//serving public files
app.use(express.static('public'));

//setting up bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//url-shortener endpoint
app.post("/api/shorturl/new", function(req, res) {
  let query = getURLQuery(req.body.url);
  query.exec(function(err, url){
     if(err) {
       return console.log(err);
     }
     if(!url) {

     }
    return 
    );
});
  res.json({original_url: req.body.url, short_url: });
});

//home routing
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });


module.exports = app;