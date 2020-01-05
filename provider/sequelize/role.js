const SequelizeProvider = require('./index');
const { role } = require('../../models/sequelize');

class RoleProvider extends SequelizeProvider {
}

module.exports = new RoleProvider(role);
