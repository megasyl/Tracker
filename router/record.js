const express = require('express');
const router = express.Router();
const recordController = require('../controller/express/record');

router.get(
    '/v1/records',
    recordController.list
);

router.get(
    '/v1/records/last-by-imei',
    recordController.lastByImei
);

module.exports = router;
