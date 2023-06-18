const keys = require('../validation/eventsValidation.js');
const db = require('../models/MdlTest.js');

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

    const getAttractions = () => {
        return {
            method: "GET",
            url: "/attractions",
            handler: authRequestHandlers.getAttractions,
        }
    }

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
        return {
            method: "GET",
            url: "/eventAds/:city",
            handler: authRequestHandlers.eventAds,
        };
    };
    const postRandomEvents = () => {
        return{
            method: "POST",
            url:"/postRandomEvents",
            handler : authRequestHandlers.postRandomEvents,
            schema : {
                body: keys
            }
        };
    };
    

    return {
        getRandomEvents,
        getEventData,
        eventAds,
        getEventsWithLocation,
        postRandomEvents,
        getAttractions
    };
};
