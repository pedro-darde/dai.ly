import express from "express";
import HttpServer, { HttpMethods } from "./HttpServer";

export default class ExpressAdapter implements HttpServer {
  app;
  constructor() {
    this.app = express();
    this.app.use(express.json());
  }

  listen(port: number): void {
    this.app.listen(port);
  }

  on(method: HttpMethods, url: string, callback: Function): void {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body);
      res.json(output);
    });
  }
}
