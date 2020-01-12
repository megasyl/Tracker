const provider = require('../../provider/sequelize/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



class Auth {
    static async login(req, res, next) {
        try {
            const { login, password } = req.body;
            const user = await provider.findByLogin(login);
            if (!user) {
                res.status(403).send({error: "Forbidden"});
            }
            console.log(password, user.password);
            const match = await bcrypt.compare(password, user.password);
            console.log(match);
            if (match) {
                const data = user;
                delete data.password;
                const token = jwt.sign({
                    data
                }, 'tygvuhbijnok,pl;jhuhbijno');
                return res.status(200).send({ token, data });
            }
            res.status(403).send({error: "Forbidden"});
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Auth;
