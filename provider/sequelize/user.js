const SequelizeProvider = require('./abstract');
const { user } = require('../../models/sequelize');

class UserProvider extends SequelizeProvider {
    async findByLogin(login) {
        try {
            return this.model.findOne({
                where: { login },
            });
        } catch (e) {
            console.log(`cannot find ${this.model.name} : ${e}`)
        }
    }
}

module.exports = new UserProvider(user);
