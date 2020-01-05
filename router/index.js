const express = require('express');
const fileService = require('../services/file');
const globalRouter = express.Router();

const routers = fileService.getFilesFromFolder(__dirname)
    .filter(v => v !== __filename)
    .filter(v => v.indexOf('index.js') !== -1)
    .map(router => require(router)); //eslint-disable-line

routers.forEach(router => globalRouter.use(router));

module.exports = globalRouter;
