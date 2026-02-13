// src/infra/http/FastifyAdapter.ts
import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import cors from "@fastify/cors";

import { HttpServer, HttpMethod } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";
import { registerLoggerHook } from "../middleware/loggerMiddleware";

export class FastifyAdapter implements HttpServer {
  private app: FastifyInstance;

  constructor() {
    this.app = Fastify();
    registerLoggerHook(this.app);
    
    this.app.register(cors, {
      origin: true,
    });
  }

  register(method: HttpMethod, url: string, controller: Controller): void {
    const normalizedUrl = this.normalizeUrl(url);

    this.app.route({
      method: method.toUpperCase() as any,
      url: normalizedUrl,
      handler: async (request: FastifyRequest, reply: FastifyReply) => {
        try {
          const httpRequest = {
            params: request.params as any,
            body: request.body as any,
            query: request.query as any,
            headers: request.headers as any,
          };

          const httpResponse = await controller.handle(httpRequest);

          return reply.status(httpResponse.statusCode).send(httpResponse.body);
        } catch (error: any) {
          return reply.status(500).send({ message: error.message });
        }
      },
    });
  }

  listen(port: number): void {
    this.app.listen({ port }, (err, address) => {
      if (err) {
        console.error(err);
        process.exit(1);
      }

      console.log(`🚀 Server listening on ${address}`);
    });
  }

  private normalizeUrl(url: string) {
    return url.replace(/\{|\}/g, "");
  }
}
