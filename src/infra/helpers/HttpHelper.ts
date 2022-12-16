import EntityNotFoundError from "../../presentation/errors/EntityNotFoundError";
import { ServerError } from "../../presentation/errors/ServerError";

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
