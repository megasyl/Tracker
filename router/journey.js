const express = require('express');
const router = express.Router();
const journeyController = require('../controller/express/journey');

router.get(
    '/v1/journeys',
    journeyController.list
);

module.exports = router;
