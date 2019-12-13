const Record = require('../models/record');
class Provider {
    static async bulkInsert(data) {
        try {
            const promises = data
                .map(recordData => new Record(recordData)).map(recordDocument => recordDocument.save);
            return await Promise.all(promises);
        } catch (e) {
            console.log("err", e);
        }
    }
}

module.exports = Provider;
