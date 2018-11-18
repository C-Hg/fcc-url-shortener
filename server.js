var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var app = express();

//enables CORS
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

//serving public files
app.use(express.static('public'));

//home routing
app.get("/", function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
  });

//configuring the listening port
var listener = app.listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
   });
   