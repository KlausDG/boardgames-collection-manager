import cors from "cors";
import express, { Request, Response } from "express";
import { HttpServer, HttpMethod } from "@/application/http/HttpServer";
import { Controller } from "@/application/http/Controller";
import loggerMiddleware from "../middleware/loggerMiddleware";

export class ExpressAdapter implements HttpServer {
  private app: express.Express;

  constructor() {
    this.app = express();
    this.app.use(loggerMiddleware);
    this.app.use(express.json());
    this.app.use(cors());
  }

  register(method: HttpMethod, url: string, controller: Controller): void {
    this.app[method](this.normalizeUrl(url), async (req: Request, res: Response) => {
      try {
        const httpRequest = {
          params: req.params,
          body: req.body,
          query: req.query,
          headers: req.headers,
        };

        const httpResponse = await controller.handle(httpRequest);

        res.status(httpResponse.statusCode).json(httpResponse.body);
      } catch (error: any) {
        res.status(500).json({ message: error.message });
      }
    });
  }

  listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`🚀 Server listening on port ${port}`);
    });
  }

  private normalizeUrl(url: string) {
    return url.replace(/\{|\}/g, "");
  }
}
