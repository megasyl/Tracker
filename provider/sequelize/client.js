const SequelizeProvider = require('./abstract');
const { client } = require('../../models/sequelize');

class ClientProvider extends SequelizeProvider { }

module.exports = new ClientProvider(client);
