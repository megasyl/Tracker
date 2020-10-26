const hydrator = require('../../hydrator/record');
const RecordProvider = require('../../provider/mongoose/record');
const vehicleProvider = require('../../provider/sequelize/vehicle');
const JourneyService = require('../../services/journey');
const websocketServer = require('../../server/websocket');
const { broadcast } = require('../../utils/websocket');

class Stream {
    static async onRecieveData(req, res, next) {
        try {
            const recordsData = hydrator(req.body);
            await RecordProvider.bulkInsert(recordsData);
            const record = recordsData[recordsData.length - 1];

            broadcast(websocketServer, {
                ...record,
                vehicle: await vehicleProvider.getByImei(record.imei)
            });
            await JourneyService.processRecords(recordsData);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Stream;
