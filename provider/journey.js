const JourneyModel = require('../models/journey');

class Journey {
    static async findOrCreate(record) {
        let result;
        const {imei, timestamp} = record;
        try {
            result = await JourneyModel.findOne({ imei, completed: false });
            if (!result) {
                result = new JourneyModel({ imei, beginTimestamp: timestamp, completed: false });
                await result.save();
                return result;
            }
        } catch (err) {
            logger.error(new Error(`${MONGO_FIND_FAILED} ${this.db} ${err}`));
        }
        return result;
    }

    static async findLastByRecord(record) {
        let result;
        const {imei} = record;
        try {
            result = await JourneyModel.findOne({ imei, completed: false });
        } catch (err) {
            logger.error(new Error(`${MONGO_FIND_FAILED} ${this.db} ${err}`));
        }
        return result;
    }
}

module.exports = Journey;
