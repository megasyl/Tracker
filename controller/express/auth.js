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
            console.log(password, user.password);
            const match = await bcrypt.compare(password, user.password);
            console.log(match);
            if (match) {
                const data = user;
                delete data.password;
                const token = jwt.sign({
                    exp: 60 * 15,
                    data
                }, 'tygvuhbijnok,pl;jhuhbijno');
                return res.status(200).send({ token });
            }
            res.status(403).send("suce pute sépaca" );
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Auth;
