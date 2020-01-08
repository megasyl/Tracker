const SequelizeProvider = require('./abstract');
const { role } = require('../../models/sequelize');

class RoleProvider extends SequelizeProvider { }

module.exports = new RoleProvider(role);
