const express = require('express');
const router = express.Router();
const userController = require('../controller/express/user');

router.post(
    '/v1/users',
    userController.create
);

router.get(
    '/v1/users',
    userController.list
);

router.get(
    '/v1/users/:id',
    userController.read
);

module.exports = router;
