const SequelizeProvider = require('./abstract');
const { sim } = require('../../models/sequelize');

class SimProvider extends SequelizeProvider { }

module.exports = new SimProvider(sim);
