import EntityNotFoundError from "../errors/http/EntityNotFoundError";
import { ServerError } from "../errors/http/ServerError";

export const notFound = (error: EntityNotFoundError) => ({
  statusCode: error.statusCode,
  body: error,
});

export const serverError = (e: Error) => ({
  statusCode: 500,
  body: new ServerError(e.stack!),
});

export const ok = (data: any) => ({
  statusCode: 200,
  body: data,
});
