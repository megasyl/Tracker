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
            console.log("searching for ", search)
            const response = await Provider.find({beginAddressCity: { "$regex": search, "$options": "i" }});
            res.status(200).send(response);
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Journey;
