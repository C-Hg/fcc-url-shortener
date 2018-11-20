const express = require('express');
const router = express.Router();

// Require the controllers
const shortURL_controller = require('../controllers/shortURL.controller');

//url-shortener endpoint
router.post("/new", shortURL_controller.evaluate_original_url);

module.exports = router;