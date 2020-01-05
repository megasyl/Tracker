const express = require('express');
const router = express.Router();
const journeyController = require('..//ntroller/express/journey');

router.get(
    '/v1/journeys',
    journeyController.read
);

module.exports = router;
