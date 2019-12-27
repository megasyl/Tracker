const JourneyModel = require('../models/journey');

class Journey {
    static async findOrCreate(record) {
        let result;
        const {imei, timestamp} = record;
        try {
            result = await JourneyModel.findOne({ imei, completed: false });
            if (!result) {
                return new JourneyModel({ imei, beginTimestamp: timestamp, completed: false })
            }
        } catch (err) {
            logger.error(new Error(`${MONGO_FIND_FAILED} ${this.db} ${err}`));
        }
        return result;
    }
}

module.exports = Journey;
