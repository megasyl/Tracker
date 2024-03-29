const JourneyModel = require('../models/journey');

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

    static async find(options) {
        let result;
        try {
            result = await JourneyModel.find(options);
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }
}

module.exports = Journey;
