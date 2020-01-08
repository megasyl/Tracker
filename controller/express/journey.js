const Provider = require('../../provider/mongoose/journey');

class Journey {
    static async read(req, res, next) {
        try {
            const { beginDate, endDate, search } = req.query;
            const match = { completed: true };
            if (beginDate && endDate) {
                match.timestamp = {
                    $gte: new Date(beginDate),
                    $lte: new Date(endDate),
                }
            }
            if (search) {
                const regex = { "$regex": search, "$options": "i" };
                match.$or = [
                    { beginAddressRoad: regex },
                    { beginAddressZip: regex },
                    { beginAddressCity: regex },
                    { beginAddressCountry: regex },
                    { endAddressRoad: regex },
                    { endAddressZip: regex },
                    { endAddressCity: regex },
                    { endAddressCountry: regex },
                    { imeiString: regex },
                ];
            }
            const response = await Provider.find(match);
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Journey;
