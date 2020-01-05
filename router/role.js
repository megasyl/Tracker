const express = require('express');
const router = express.Router();
const roleController = require('../controller/express/role');

router.get(
    '/v1/roles',
    roleController.readAll
);

module.exports = router;
