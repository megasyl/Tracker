const Record = require('../models/record');
class Provider {
    static async bulkInsert(data) {
        try {
            const promises = data
                .map(recordData => new Record(recordData).save())
            const result = await Promise.all(promises);
            console.log(result);
            return result;
        } catch (e) {
            console.log("err", e);
        }
    }
}

module.exports = Provider;
