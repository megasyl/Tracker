const express = require('express');
const router = express.Router();
const clientController = require('../controller/express/client');

router.post(
    '/v1/clients',
    clientController.create
);

router.get(
    '/v1/clients',
    clientController.list
);

router.get(
    '/v1/clients/:id',
    clientController.read
);

router.put(
    '/v1/clients/:id',
    clientController.update
);

router.delete(
    '/v1/clients/:id',
    clientController.delete
);

module.exports = router;
