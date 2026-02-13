import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export function registerLoggerHook(app: FastifyInstance) {
  app.addHook("onRequest", async (request: FastifyRequest, reply: FastifyReply) => {
    console.log(`Requisição: ${request.method} ${request.url}`);
    console.log("Corpo da requisição:", request.body);

    // armazenar start time no contexto da request
    (request as any).__startTime = Date.now();
  });

  app.addHook("onResponse", async (request: FastifyRequest, reply: FastifyReply) => {
    const start = (request as any).__startTime ?? Date.now();
    const duration = Date.now() - start;

    console.log(
      `Resposta: ${reply.statusCode} - ${request.method} ${request.url} - ${duration}ms`,
    );
  });
}
