const SequelizeProvider = require('./abstract');
const { user } = require('../../models/sequelize');

class UserProvider extends SequelizeProvider { }

module.exports = new UserProvider(user);
