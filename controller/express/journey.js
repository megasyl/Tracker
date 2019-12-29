const Provider = require('../../provider/journey');

class Journey {
    static async read(req, res, next) {
        try {
            const { beginDate, endDate, search } = req.query;
            const match = {
                timestamp: {
                    $gte: new Date(beginDate),
                    $lte: new Date(endDate),
                },
            };
            const response = await Provider.find({beginAddressCity: new RegExp('^'+search+'$', "i")});
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Journey;
