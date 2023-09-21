const fastify = require("fastify")({
  logger: true,
});

const keycloak = require("fastify-keycloak-adapter");

const unauthorizedHandler = (_request, reply) => {
  reply.status(401).send(`Invalid request`);
};

const port = 3000;
const opts = {
  appOrigin: `http://localhost:${port}`,
  keycloakSubdomain: "localhost:8080/realms/keycloak-sample",
  clientId: "server-nodejs",
  clientSecret: "r6iVt3po6UXfLInpKLmE26yEoBnlP7vb",
  unauthorizedHandler,
  excludedPatterns: ["/public"],
};

fastify.register(require("@fastify/cors"));
fastify.register(keycloak, opts);

fastify.get("/public", function (_request, reply) {
  reply.send({ hello: "world" });
});

fastify.get("/todos", function (_request, reply) {
  reply.send([{ id: 1, title: "Buy milk", completed: false }]);
});

fastify.listen({ port }, function (err, _address) {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
