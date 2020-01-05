const provider = require('../../provider/sequelize/role');

class Role {
    static async list(req, res, next) {
        try {
            const results = await provider.findAll();
            res.status(200).send(results);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Role;
