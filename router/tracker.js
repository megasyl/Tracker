const express = require('express');
const router = express.Router();
const trackerController = require('../controller/express/tracker');

router.post(
    '/v1/trackers',
    trackerController.create
);

router.get(
    '/v1/trackers',
    trackerController.list
);

router.get(
    '/v1/trackers/:id',
    trackerController.read
);

router.put(
    '/v1/trackers/:id',
    trackerController.update
);

router.delete(
    '/v1/trackers/:id',
    trackerController.delete
);

module.exports = router;
