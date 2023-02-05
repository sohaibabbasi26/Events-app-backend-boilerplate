module.exports = function AuthRequestSchema(opts) {
    const { authRequestHandlers, Joi } = opts;
    // const verifyAuthOtvc = () => {
    //     return {
    //         method: 'POST',
    //         schema: {
    //             body: Joi.object().keys({
    //                 otvc: Joi.string().required(),
    //                 phone: Joi.string().required(),
    //             })
    //         },
    //         url: '/verify/auth/otvc',
    //         handler: authRequestHandlers.verifyAuthOtvc,
    //     }
    // }

    const getRandomEvents = () => {
        return {
            method: "GET",
            url: "/randomEvents",
            handler: authRequestHandlers.getRandomEvents,
        };
    };
    const getEventData = () => {
        return {
            method: "GET",
            url: "/getEventData",
            handler: authRequestHandlers.getEventData,
        };
    };
    const getEventsWithLocation = () => {
        return {
            method: "GET",
            url: "/getEventsWithLocation",
            handler: authRequestHandlers.getEventsWithLocation,
            
        };
    };
    const eventAds = () => {

        return{ 
            method: "GET", 
            url : '/eventAds/:city',
            handler : authRequestHandlers.eventAds,
        }
    }

    return {
        getRandomEvents,
        reqtest,
        getEventData,
        eventAds,
        getEventsWithLocation,
    };
};
