import { Controller } from "./Controller";

export type HttpMethod = "get" | "post" | "put" | "patch" | "delete";

export interface HttpServer {
  register(method: HttpMethod, url: string, controller: Controller): void;
  listen(port: number): void;
}
