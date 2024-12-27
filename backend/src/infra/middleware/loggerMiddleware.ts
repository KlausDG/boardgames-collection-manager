import { NextFunction, Request, Response } from "express";

const loggerMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  console.log(`Requisição: ${req.method} ${req.url}`);
  console.log("Corpo da requisição:", req.body);

  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`Resposta: ${res.statusCode} - ${req.method} ${req.url} - ${duration}ms`);
  });

  next();
};

export default loggerMiddleware;
