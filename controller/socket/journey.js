const JourneyProvider = require('../../provider/journey');
const hydrator = require('../../hydrator/journey');
class SocketJourneyController {
    static async processRecords(records) {
        try {
            for (const i in records) {
                const record = records[i];
                if (!record.ignition) {
                    console.log('NOT ignited, looking for non completed journey');
                    let journey = await JourneyProvider.findLastByRecord(record);
                    if (journey && journey.records.length) {
                        journey = await hydrator(journey, record);
                        if (journey) await journey.save();
                    }
                    continue;
                }
                const journey = await JourneyProvider.findOrCreate(record);
                journey.records.push(record);
                await journey.save();
            }
        } catch (e) {
            console.log('ERROR: ', e);
        }

    }
}

module.exports = SocketJourneyController;
