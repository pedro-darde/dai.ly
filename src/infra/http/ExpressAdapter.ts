import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import HttpServer, { HttpMethods } from "./HttpServer";
import cors from "cors";
import { HttpResponse } from "../helpers/HttpHelper";
export default class ExpressAdapter implements HttpServer {
  app;
  constructor() {
    this.app = express();
    this.app.use(express.json({ limit: "50mb" }));
    this.app.use(cors());
  }

  listen(port: number): void {
    this.app.listen(port);
  }

  on(
    method: HttpMethods,
    url: string,
    callback: (params: any, body: any) => Promise<HttpResponse>
  ): void {
    this.app[method](url, async (req, res) => {
      const output = await callback(req.params, req.body);
      res.status(output.statusCode).json(output.body);
    });
  }
}
