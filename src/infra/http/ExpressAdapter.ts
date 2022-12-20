import express from "express";
import HttpServer, { HttpMethods } from "./HttpServer";
import cors from "cors";
export default class ExpressAdapter implements HttpServer {
  app;
  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  listen(port: number): void {
    this.app.listen(port);
  }

  on(method: HttpMethods, url: string, callback: Function): void {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body);
      res.status(output.statusCode).json(output.body);
    });
  }
}
