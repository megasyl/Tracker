const express = require('express');
const router = express.Router();
const vehicleController = require('../../controller/express/vehicle');

router.post(
    '/v1/vehicles',
    vehicleController.create
);

module.exports = router;
