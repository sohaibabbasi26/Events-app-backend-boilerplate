module.exports = function SvcTalos(opts) {
    const { svcCache, queryHandler, mdlTest, db, eventAd, _ } = opts;

    async function getFromDB({ phone }) {
        //const token = await svcCache.getKV({ key: 'ELRP_TOKEN' });
        const result = await db["primary"].any(mdlTest.query, "");
        const response = result;
        return response;
    }
    async function getRandomEvents() {
        console.log("hello from svc Talos");
        const result = await db["primary"].any(mdlTest.getRandomEvents, "");

        return result;
    }
    async function getEventData(id) {
        const result = await db["primary"].any(mdlTest.getEventData, {
            event_id: id,
        });

        return result;
    }

    async function eventAds(tableName) {
        console.log("services-> ", tableName);

        const res = await db["primary"].any(eventAd.checkCityExists, {
            tablename: tableName,
        });
        const { table_name } = res[0];
        if (!table_name) {
            return { message: "City not found" };
        } else {
            console.log("here");
            const result = await db["primary"].any(eventAd.getEvents, {
                table: table_name,
            });
            return result;
        }
    }
    async function getEventsWithLocation(id) {
        const result = await db["primary"].any(mdlTest.getEventsWithLocation, {
            destination_id: id,
        });
        // console.log(result);
        return result;
    }

    return {
        getFromDB,
        getRandomEvents,
        getEventData,

        eventAds,
        getEventsWithLocation,
    };
};
