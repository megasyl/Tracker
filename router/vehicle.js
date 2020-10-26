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

router.put(
    '/v1/vehicles/:id',
    vehicleController.update
);

router.delete(
    '/v1/vehicles/:id',
    vehicleController.delete
);

module.exports = router;
