// src/application/http/validateBody.ts
import { ZodType, ZodError } from "zod";
import { Controller } from "../http/Controller";
import { HttpRequest } from "../http/HttpRequest";
import { HttpResponse } from "../http/HttpResponse";

export function validateBody<T>(
  schema: ZodType<T>,
  controller: Controller,
): Controller {
  return {
    async handle(request: HttpRequest): Promise<HttpResponse> {
      try {
        // Valida e substitui o body pelo valor parseado
        request.body = schema.parse(request.body);
        return await controller.handle(request);
      } catch (err: any) {
        if (err instanceof ZodError) {
          return {
            statusCode: 400,
            body: { message: err.issues },
          };
        }

        return {
          statusCode: 500,
          body: { message: err.message },
        };
      }
    },
  };
}
