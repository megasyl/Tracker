const express = require('express');
const router = express.Router();
const vehicleController = require('../controller/express/vehicle');

router.post(
    '/v1/vehicles',
    vehicleController.create
);

router.get(
    '/v1/vehicles',
    vehicleController.list
);

router.get(
    '/v1/vehicles/:id',
    vehicleController.read
);

module.exports = router;
