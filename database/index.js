const mongoose = require('mongoose');
const config = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    user: process.env.MONGO_USER,
    password: process.env.MONGO_PASSWORD,
};
const url = `mongodb://${config.host}:${config.port}`;
module.exports = mongoose.connect(`${url}/ruptela`, {
    //user: config.user,
    //pass: config.password,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
