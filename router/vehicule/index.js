const express = require('express');
const router = express.Router();
const vehicleController = require('../../controller/express/vehicle');

router.get(
    '/v1/vehicles',
    vehicleController.create
);

module.exports = router;
