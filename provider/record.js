const Record = require('../models/mongoose/record');
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

    static async find(options) {
        let result;
        try {
            result = await Record.find(options);
        } catch (err) {
            console.log("err", err);
        }
        return result;
    }

    static async findLastByIMEI() {
        try {
            const result = await Record.aggregate([
                {$sort: { timestamp: -1 }},
                {$group: { _id: "$imei",
                        record: {$first : "$$ROOT"}
                    }},
            ]);
            return result;
        } catch (e) {
            console.log('err', e)
        }
    }
}

module.exports = Provider;
