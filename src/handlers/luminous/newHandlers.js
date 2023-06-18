module.exports = function newAuthRequestHandlers(opts) {
    const { newMediators, Joi } = opts;

    async function getDummyData(request,reply) {
        const sent =  await newMediators.getDummyData(); //"Hellow from the handler"
        reply.send(sent);
    }

    async function getMainData(request,reply) {
        const sent = await newMediators.getMainData(); //"Hellow from the handler"
        reply.send(sent);
    }

    return {
        getDummyData,
        getMainData
    }
}