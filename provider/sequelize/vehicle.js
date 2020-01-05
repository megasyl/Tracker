const SequelizeProvider = require('./index');
const { vehicle } = require('../../models/sequelize');

class VehicleProvider extends SequelizeProvider {

}

module.exports = new VehicleProvider(vehicle);
