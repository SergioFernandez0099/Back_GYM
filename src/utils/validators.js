import { param, validationResult } from "express-validator";
import {ErrorIncorrectParam} from "../errors/businessErrors.js";

export function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function isNumber(value) {
  return typeof value === "number" && !isNaN(value);
}

export function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

export function isBoolean(value) {
  return typeof value === "boolean";
}

export const validateId = [
  param("id")
    .exists()
    .withMessage("ID es requerido")
    .isInt({ gt: 0 })
    .withMessage("ID debe ser un número positivo"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const error = new ErrorIncorrectParam("ID inválido");
      return next(error);
    }
    next();
  },
];
