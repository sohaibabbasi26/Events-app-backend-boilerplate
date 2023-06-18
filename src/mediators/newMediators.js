module.exports = function newAuthMediator(opts) {
    const { newSvcTalos } = opts;

    async function getDummyData() {
        const result = await newSvcTalos.getDummyData();
        return result; 
    }

    async function getMainData() {
        const result = await newSvcTalos.getMainData();
        return result; 
    }

    return {
        getDummyData,
        getMainData
    }
}