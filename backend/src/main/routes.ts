import { HttpServer, HttpMethod } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";

export type Route = {
  method: HttpMethod;
  path: string;
  controller: Controller;
};

export function setupRoutes(httpServer: HttpServer, routes: Route[]) {
  routes.forEach(({ method, path, controller }) => {
    httpServer.register(method, path, controller);
  });
}
