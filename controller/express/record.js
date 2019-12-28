const Provider = require('../../provider/record');

class Record {
    static async list(req, res, next) {
        try {
            const { beginDate, endDate } = req.query;
            const match = {
                timestamp: {
                    $gte: new Date(beginDate),
                    $lte: new Date(endDate),
                },
            };
            const response = await Provider.find({match});
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }

    static async lastByImei(req, res, next) {
        try {
            const { beginDate, endDate } = req.query;
            const response = await Provider.findLastByIMEI();
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Record;
