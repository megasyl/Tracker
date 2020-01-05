const SequelizeProvider = require('./index');
const { tracker } = require('../../models/sequelize');

class TrackerProvider extends SequelizeProvider {
}

module.exports = new TrackerProvider(tracker);
