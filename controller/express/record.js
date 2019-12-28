const Provider = require('../../provider/record');
const GoogleServices = require('../../services/google');

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
            let response = await Provider.findLastByIMEI();
            response = await Promise.all(response.map(async entry => {
                const location = [
                    entry.record.latitude,
                    entry.record.longitude
                ];
                entry.record.address = await GoogleServices.getAddressFromLocation(location);
                return response;
            }));

            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Record;
