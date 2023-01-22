const fastify = require("fastify");
const helmet = require("@fastify/helmet");
const fastifyJWT = require("fastify-jwt");
const fastifyCors = require("@fastify/cors");
const swagger = require("@fastify/swagger");
const swaggerUI = require("@fastify/swagger-ui");
const config = require("./config");
const di = require("./di");
const adapters = require("../adapters");
const headlocker = require("../middleware/Headlocker");
const errorDecorator = require("../middleware/ErrorDecorator");
const responseDecorator = require("../middleware/ResponseDecorator");

module.exports = async function FastServer(options) {
    const process = options.process;

    let userOptions = options.options;

    if (userOptions === undefined) userOptions = {};

    if (process === undefined)
        throw new Error("FastServer is dependent on [process]");

    let _server = null;

    const defaultOptions = {
        bodyLimit: 1048576 * 8,
        logger: {
            level: config.get("fastify").log_level,
            // prettyPrint: true,
            serializers: {
                res(res) {
                    return {
                        code: res.code,
                        body: res.body,
                    };
                },
                req(req) {
                    return {
                        method: req.method,
                        url: req.url,
                        path: req.path,
                        parameters: req.parameters,
                        headers: req.headers,
                    };
                },
            },
        },
    };

    const serverOptions = { ...defaultOptions, ...userOptions };

    if (_server === null) _server = await fastify(serverOptions);
    _server.register(require("@fastify/swagger"), {
        swagger: {
            info: {
                title: "Test swagger",
                description: "Testing the Fastify swagger API",
                version: "0.1.0",
            },
            externalDocs: {
                url: "https://swagger.io",
                description: "Find more info here",
            },
            host: "localhost",
            schemes: ["http"],
            consumes: ["application/json"],
            produces: ["application/json"],
            tags: [
                { name: "user", description: "User related end-points" },
                { name: "code", description: "Code related end-points" },
            ],
            definitions: {
                User: {
                    type: "object",
                    required: ["id", "email"],
                    properties: {
                        id: { type: "string", format: "uuid" },
                        firstName: { type: "string" },
                        lastName: { type: "string" },
                        email: { type: "string", format: "email" },
                    },
                },
            },
            securityDefinitions: {
                apiKey: {
                    type: "apiKey",
                    name: "apiKey",
                    in: "header",
                },
            },
        },
    });
    _server.register(require("@fastify/swagger-ui"), {
        routePrefix: "/docs",
        uiConfig: {
            docExpansion: "full",
            deepLinking: false,
        },
        uiHooks: {
            onRequest: function (request, reply, next) {
                next();
            },
            preHandler: function (request, reply, next) {
                next();
            },
        },
        staticCSP: true,
        transformStaticCSP: (header) => header,
        transformSpecification: (swaggerObject, request, reply) => {
            return swaggerObject;
        },
        transformSpecificationClone: true,
    });

    const defaultInitialization = async () => {
        await defaultMiddleware();

        const _di = await di({
            logger: _server.log,
            config,
        });

        const _container = await _di._container();

        const _adapters = await adapters(_container.cradle);

        await _di.register("db", _adapters.db, true);
        await _di.register("cache", _adapters.cache, true);

        await decorateServer("di", () => _container);

        _server.decorateRequest("elSession", null);

        _server.setValidatorCompiler(
            ({ schema }) =>
                (data) =>
                    schema.validate(data)
        );
    };

    const defaultMiddleware = async () => {
        _server.register(helmet);
        _server.register(fastifyCors);

        _server.register(fastifyJWT, {
            secret: config.get("jwt").secret,
        });

        _server.setErrorHandler(function (error, request, reply) {
            const { _, Boom } = _server.di().cradle;
            // if "joi" error object
            if (error && error.isJoi) {
                error = Boom.badRequest(error.message, error.details);
            }

            // if "boom" error object
            if (error && error.isBoom) {
                const _code = _.get(error, "output.statusCode", 500);
                const _payload = Object.assign(
                    error.output.payload,
                    { data: error.data },
                    { message: error.message }
                );

                // change "statusCode" to "code"
                _.set(_payload, "code", _code);
                _.unset(_payload, "statusCode");

                // remove "data" if "null"
                if (_.isNull(_payload.data)) _.unset(_payload, "data");

                // respond
                reply
                    .code(_code)
                    .type("application/json")
                    .headers(error.output.headers)
                    .send(_payload);

                return;
            }

            reply.send(error || new boom("Got non-error: " + error));
        });

        _server.register(responseDecorator);

        _server.register(headlocker);
    };

    const registerRoutes = async ({ routes, prefix }) => {
        if (!prefix) prefix = config.get("server").api_prefix;

        _server.register(routes, { prefix });
    };

    const registerMiddleware = async (middleware, options = {}) => {
        _server.register(middleware, options);
    };

    const decorateServer = async function decorateServer(key, value) {
        _server.decorate(key, value);
    };

    const start = async function start() {
        try {
            await defaultInitialization();
            console.log(_server);
            await _server.listen({
                port: config.get("server").port,
                host: config.get("server").host,
            });
            await _server.swagger();
        } catch (_error) {
            console.error("Shutting Down Due To Fatal Exception >");
            console.error("Server Initialization Error >", _error);
            process.exit(1);
        }
    };

    return {
        registerRoutes,
        registerMiddleware,
        decorateServer,
        start,
        fastServer: _server,
    };
};
