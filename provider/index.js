const Record = require('../models/record');
class Provider {
    static async bulkInsert(data) {
        try {
            const promises = data
                .map(recordData => new Record(recordData).save())
            return Promise.all(promises);
        } catch (e) {
            console.log("err", e);
        }
    }

    async find(options) {
        let result;
        try {
            result = await Record.find(options);
        } catch (err) {
            logger.error(new Error(`${MONGO_FIND_FAILED} ${this.db} ${err}`));
        }
        return result;
    }
}

module.exports = Provider;
