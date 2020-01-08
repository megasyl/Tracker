const express = require('express');
const router = express.Router();
const simController = require('../controller/express/sim');

router.post(
    '/v1/sims',
    simController.create
);

router.get(
    '/v1/sims',
    simController.list
);

router.get(
    '/v1/sims/:id',
    simController.read
);

router.put(
    '/v1/sims/:id',
    simController.update
);

router.delete(
    '/v1/sims/:id',
    simController.delete
);

module.exports = router;
