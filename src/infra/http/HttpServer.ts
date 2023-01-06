import { HttpResponse } from "../helpers/HttpHelper";

export default interface HttpServer {
  listen: (port: number) => void;
  on: (
    method: HttpMethods,
    url: string,
    callback: (params: any, body: any) => Promise<HttpResponse>
  ) => void;
}

export type HttpMethods =
  | "post"
  | "get"
  | "delete"
  | "patch"
  | "put"
  | "head"
  | "connect"
  | "options"
  | "trace";
