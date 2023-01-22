module.exports = function AuthRequestSchema(opts) {
    const { authRequestHandlers, Joi } = opts;

    const verifyAuthOtvc = () => {
        return {
            method: "POST",
            schema: {
                body: Joi.object().keys({
                    otvc: Joi.string().required(),
                    phone: Joi.string().required(),
                }),
            },
            url: "/verify/auth/otvc",
            handler: () => {},
        };
    };

    const reqtest = () => {
        return {
            method: "POST",
            url: "/test",
            schema: {
                description: "post some data",
                tags: ["user", "code"],
                summary: "qwerty",
                params: {
                    type: "object",
                    properties: {
                        id: {
                            type: "string",
                            description: "user id",
                        },
                    },
                },
                body: {
                    type: "object",
                    properties: {
                        hello: { type: "string" },
                        obj: {
                            type: "object",
                            properties: {
                                some: { type: "string" },
                            },
                        },
                    },
                },
                response: {
                    201: {
                        description: "Successful response",
                        type: "object",
                        properties: {
                            hello: { type: "string" },
                        },
                    },
                    default: {
                        description: "Default response",
                        type: "object",
                        properties: {
                            foo: { type: "string" },
                        },
                    },
                },
                security: [
                    {
                        apiKey: [],
                    },
                ],
            },
            handler: authRequestHandlers.test,
        };
    };

    return {
        reqtest,
        verifyAuthOtvc,
    };
};
