//loading dependencies
var express = require('express');
var app = express();
require('dotenv').config();
var myApp = require("./myApp");

//enables CORS
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

//mongodb setup
var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to database"));


//configuring the listening port
var listener = (app, myApp).listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
   });
   