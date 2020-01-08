const SequelizeProvider = require('./abstract');
const { vehicle } = require('../../models/sequelize');

class VehicleProvider extends SequelizeProvider { }

module.exports = new VehicleProvider(vehicle);
