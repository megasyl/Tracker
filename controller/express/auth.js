const provider = require('../../provider/sequelize/auth');

class Auth {
    static async login(req, res, next) {
        try {
            const results = await provider.findAll();
            res.status(200).send(results);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Auth;
