const express = require('express');
const router = express.Router();

// Require the controllers
const originalURL_controller = require('../controllers/originalURL.controller');
const shortURL_controller = require('../controllers/shortURL.controller');


//url-shortener endpoint
router.post("/new", originalURL_controller.evaluate_original_url);

//url-redirection endpoint
//router.get("/:short_url", shortURL_controller.evaluate_short_url);

module.exports = router;