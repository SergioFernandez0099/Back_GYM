import { ErrorIncorrectParam } from "../../errors/businessErrors.js";

export function validateBody(req, res, next) {
  if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
    const error = new ErrorIncorrectParam("Body vacío o inválido");
    return next(error);
  }
  next();
}