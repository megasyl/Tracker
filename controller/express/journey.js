const Provider = require('../../provider/mongoose/journey');

class Journey {
    static async list(req, res, next) {
        try {
            const { beginDate, endDate, search } = req.query;

            const response = await Provider.find({ beginDate, endDate, search });
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Journey;
