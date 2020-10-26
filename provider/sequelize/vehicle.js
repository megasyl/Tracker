const SequelizeProvider = require('./abstract');
const { vehicle, tracker } = require('../../models/sequelize');

class VehicleProvider extends SequelizeProvider {
    async getByImei(imei) {
        try {
            const result = await tracker.findOne({
                where: { imei },
                include: [{
                    model: vehicle,
                }]
            });
            return result.vehicle;
        } catch (e) {
            console.log(`cannot find by imei ${this.model.name}s : ${e}`)
        }
    }
}

module.exports = new VehicleProvider(vehicle);
