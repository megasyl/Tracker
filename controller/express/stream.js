const hydrator = require('../../hydrator/record');
const RecordProvider = require('../../provider/mongoose/record');
const JourneyService = require('../../services/journey');
const websocketServer = require('../../server/websocket');
const { broadcast } = require('../../utils/websocket');

class Stream {
    static async onRecieveData(req, res, next) {
        try {
            const recordsData = hydrator(req.body);
            await RecordProvider.bulkInsert(recordsData);
            broadcast(websocketServer, recordsData[recordsData.length - 1]);
            await JourneyService.processRecords(recordsData);
            res.status(200).send();
        } catch (e) {
            return next(e);
        }
    }
}

module.exports = Stream;
