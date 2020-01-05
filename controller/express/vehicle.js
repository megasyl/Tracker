const provider = require('../../provider/sequelize/vehicle ');

class Vehicle {
    static async list(req, res, next) {
        try {
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    }

    static async create(req, res, next) {
        try {
            await provider.create(req.body);
            res.status(201).send();
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Vehicle;
