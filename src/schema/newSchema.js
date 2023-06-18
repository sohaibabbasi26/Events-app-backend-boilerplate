module.exports = function newAuthRequestSchema (opts) {

    const { newHandlers, Joi } = opts;
    const getDummyData = () => {
        return {
            method: "GET",
            url: "/getPostsDummyData",
            handler: newHandlers.getDummyData
            // handler : (req,res) => {
            //     res.send("Hello")
            // }
        }
    }

    const getMainData = () => {
        return {
            method: "GET",
            url: "/getMainData",
            // handler: (req,res) => {
            //     res.send("hello from another route!");
            // }
            handler: newHandlers.getMainData
        }
    }

    return {
        getDummyData,
        getMainData
    }
}