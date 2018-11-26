//loading dependencies
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require("body-parser");
const dns = require('dns');

//enables CORS
const cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));

//serving public files
app.use('/public', express.static(process.cwd() + '/public'));

//setting up bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//Mongoose setup
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true});
mongoose.Promise = global.Promise;
//Get the default connection
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log("Connected to database"));

//importing routes
const shorturl_routes = require('./routes/shortURL.route');

//home routing
app.get("/", function (req, res) {
   res.sendFile(__dirname + '/views/index.html');
 });

//api routing
app.use('/api/shorturl', shorturl_routes);

//configuring the listening port
var listener = (app).listen(process.env.PORT || 3000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
   });
   