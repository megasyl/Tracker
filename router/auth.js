const express = require('express');
const router = express.Router();
const authController = require('../controller/express/auth');

router.post(
    '/v1/login',
    authController.login
);

module.exports = router;
