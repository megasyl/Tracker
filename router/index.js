const express = require('express');
const router = express.Router();
const recordController = require('../controller/express/record');
const journeyController = require('../controller/express/journey');

router.get(
    '/v1/records',
    recordController.list
);

router.get(
    '/v1/records/last-by-imei',
    recordController.lastByImei
);

router.get(
    '/v1/journeys',
    journeyController.read
);

module.exports = router;
