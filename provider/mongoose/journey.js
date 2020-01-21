const JourneyModel = require('../../models/mongoose/journey');

class Journey {
    static async findOrCreate(record) {
        let result;
        const {imei, timestamp} = record;
        try {
            result = await JourneyModel.findOne({ imei, completed: false });
            if (!result) {
                result = new JourneyModel({ imei, imeiString: parseInt(imei, 10), beginTimestamp: timestamp, completed: false });
                await result.save();
                return result;
            }
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }

    static async findLastByRecord(record) {
        let result;
        const {imei} = record;
        try {
            result = await JourneyModel.findOne({ imei, completed: false });
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }

    static async findLastById(id) {
        let result;
        try {
            result = await JourneyModel.findOne({ _id: id });
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }


    static async find({ beginDate, endDate, search }) {
        let result;
        try {
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
            result = await JourneyModel.find(match)
                .select({ "records": 0, "snappedPoints": 0, "interpolatedPoints": 0})
                .sort({beginTimestamp: 'desc'})
                .exec();
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }
}

module.exports = Journey;
