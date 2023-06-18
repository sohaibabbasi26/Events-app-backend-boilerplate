module.exports = function SvcTalos(opts) {
    const { svcCache, queryHandler, newMdlTest, db, eventAd, _ } = opts;

    async function getDummyData() {
        console.log("hello from new svc Talos");
        const result = await db["primary"].any(newMdlTest.query, "");

        return result;
    }

    async function getMainData() {
        console.log("hello from new svc Talos");
        const result = await db["primary"].any(newMdlTest.query, "");

        return result;
    }

    

    

    return{
        getDummyData,
        getMainData
    }
}