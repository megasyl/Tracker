const express = require('express');
const router = express.Router();
const controller = require('../controller/express');

router.get(
    '/v1/records',
    controller.read
);
module.exports = router;
