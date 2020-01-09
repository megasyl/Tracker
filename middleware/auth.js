const jwt = require('jsonwebtoken');

module.exports = (role) => (req, res, next) => {
    const token = req.header('access-token');
    const { data, exp } = jwt.verify(token, 'tygvuhbijnok,pl;jhuhbijno');
    //todo update last login
    if (data.role.name === role) {
        req.user = data;
        return next();
    }
    res.status(403).send('suce pute movétoken')
};
