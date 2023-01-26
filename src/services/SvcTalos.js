module.exports = function SvcTalos(opts) {
    const { svcCache, queryHandler, mdlTest, db } = opts;
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
    async function getEventsWithLocation(id) {
        const result = await db["primary"].any(mdlTest.getEventsWithLocation, {
            destination_id: id,
        });
console.log(result);
        // return result;
    }

    return {
        getFromDB,
        getRandomEvents,
        getEventData,
        getEventsWithLocation,
    };

    return {
        getFromDB,
    };
};
