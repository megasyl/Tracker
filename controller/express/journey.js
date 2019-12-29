const Provider = require('../../provider/journey');

class Journey {
    static async read(req, res, next) {
        try {
            const { beginDate, endDate, search } = req.query;
            const match = {};
            if (beginDate && endDate) {
                match.timestamp = {
                    $gte: new Date(beginDate),
                    $lte: new Date(endDate),
                }
            }
            if (search) {
                const regex = { "$regex": search, "$options": "i" };
                const regexNumber = { "$regex": parseInt(search,10), "$options": "i" };
                match.beginAddressRoad = regex;
                match.beginAddressZip = regexNumber;
                match.beginAddressCity = regex;
                match.beginAddressCountry = regex;
                match.endAddressRoad = regex;
                match.endAddressZip = regexNumber;
                match.endAddressCity = regex;
                match.endAddressCountry = regex;
                match.imeiString = regexNumber;
            }
            const response = await Provider.find(match);
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Journey;
