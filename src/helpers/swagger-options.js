exports.options = {
    openapi: "3.0.0",
    routePrefix: "/documentation",
    exposeRoute: true,
    definition: {
        info: {
            title: "Swagger tutorial",
            description: "Swagger tutorial APIS",
            version: "1.0.0",
        },
        externalDocs: {
            url: "https://swagger.io",
            description: "Find more info here",
        },
        servers: [
            {
                url: "http://localhost:3001/",
                description: "Local server",
            },
        ],

        host: "localhost:3001",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
    },
    apis: ["../schema/AuthRequestSchema.js"], // specify the path(s) to your API route files
};
