const express = require('express');
const router = express.Router();
const streamController = require('../controller/express/stream');

router.post(
    '/v1/stream',
    streamController.onRecieveData
);

module.exports = router;
