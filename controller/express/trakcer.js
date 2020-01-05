const provider = require('../../provider/sequelize/tracker');

class Tracker {
    static async list(req, res, next) {
        try {
            const results = await provider.findAll();
            res.status(200).send(results);
        } catch (e) {
            return next(e);
        }
    }

    static async read(req, res, next) {
        try {
            const results = await provider.findById(req.params.id);
            res.status(200).send(results);
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

module.exports = Tracker;
