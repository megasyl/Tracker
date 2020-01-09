const SequelizeProvider = require('./abstract');
const { user } = require('../../models/sequelize');

class AuthProvider extends SequelizeProvider { }

module.exports = new AuthProvider(user);
