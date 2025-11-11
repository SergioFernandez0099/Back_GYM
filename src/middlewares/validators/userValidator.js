import { ErrorIncorrectParam } from "../../errors/businessErrors.js";
import { isNonEmptyString } from "../../utils/validators.js";

function validatePin(pin) {
   if (!isNonEmptyString(pin)) throw new ErrorIncorrectParam("PIN vacío");
  if (pin.length < 4 || pin.length > 20) {
    throw new ErrorIncorrectParam("PIN debe tener entre 4 y 20 caracteres");
  }
}

export function validateCreateUser(req, res, next) {
  try {
    const { name, pin } = req.body;
    if (!isNonEmptyString(name)) {
      throw new ErrorIncorrectParam(
        "El campo 'nombre' es obligatorio y debe ser un string no vacío"
      );
    }
    validatePin(pin);
    next();
  } catch (error) {
    next(error);
  }
}

export function validateUpdateUser(req, res, next) {
  try {
    const { name, pin } = req.body;
    if (name !== undefined && !isNonEmptyString(name)) {
      throw new ErrorIncorrectParam(
        "Si se envía, el campo 'nombre' debe ser un string no vacío"
      );
    }
    if (pin !== undefined) {
      validatePin(pin);
    }
    if (name === undefined && pin === undefined) {
      throw new ErrorIncorrectParam(
        "Debes enviar al menos un campo para actualizar"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
