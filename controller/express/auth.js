const provider = require('../../provider/sequelize/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class Auth {
    static async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const user = await provider.findByLogin(login);
            if (!user) {
                res.status(404).send("suce pute yapa");
            }
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                const data = user;
                delete data.password;
                const token = jwt.sign({
                    exp: 60 * 15,
                    data
                }, 'tygvuhbijnok,pl;jhuhbijno');
                res.status(200).send({ token });
            }
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Auth;
