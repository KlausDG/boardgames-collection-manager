import { Controller } from "./Controller";
import { HttpRequest } from "./HttpRequest";
import { HttpResponse } from "./HttpResponse";
import { HttpError } from "@/shared/errors/HttpError";

export abstract class BaseController implements Controller {
  async handle(request: HttpRequest): Promise<HttpResponse> {
    try {
      return await this.execute(request);
    } catch (error: any) {
      if (error instanceof HttpError) {
        return { statusCode: error.statusCode, body: { message: error.message } };
      }
      return { statusCode: 500, body: { message: "Internal server error" } };
    }
  }

  protected abstract execute(request: HttpRequest): Promise<HttpResponse>;
}
