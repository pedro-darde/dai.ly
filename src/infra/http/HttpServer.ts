export default interface HttpServer {
  listen: (port: number) => void;
  on: (method: HttpMethods, url: string, callback: Function) => void;
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
