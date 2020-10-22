const mongoose = require('mongoose');
const config = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
};

if (!config.host || !config.port) {
    throw new Error('Missing variables for MongoDB');
}

const url = `mongodb://${config.host}:${config.port}`;
module.exports = mongoose.connect(`${url}/ruptela`, {
    user: config.user,
    pass: config.password,
    auth: {
        authSource: 'admin',
    },
    useNewUrlParser: true,
    useUnifiedTopology: true
});
