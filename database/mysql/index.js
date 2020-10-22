const Sequelize = require('sequelize');

const config = {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    dbName: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
};

if (!config.dbName || !config.user || !config.host || !config.port) {
    throw new Error('Missing variables for MySQL');
}

const sequelize = new Sequelize(config.dbName, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    define: { timestamps: false },
    logging: process.env.SEQUELIZE_DEBUG === 'true',
});

sequelize.sync();

module.exports = sequelize;
