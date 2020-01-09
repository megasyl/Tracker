const provider = require('../../provider/sequelize/user');
const bcrypt = require('bcrypt');

class User {
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
            const hash = await bcrypt.hash(req.body.password, 10);
            const data = {
                ...req.body,
                password: hash
            };
            await provider.create(data);
            res.status(201).send();
        } catch (e) {
            return next(e);
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.query;
            const { body } = req;
            await provider.update(id, body);
            res.status(204).send();
        } catch (e) {
            return next(e);
        }
    }

    static async delete(req, res, next) {
        try {
            const { id } = req.query;
            await provider.delete(id);
            res.status(204).send();
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = User;
