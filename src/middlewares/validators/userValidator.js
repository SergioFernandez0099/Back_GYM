import { ErrorIncorrectParam } from "../../errors/businessErrors.js";
import { isNonEmptyString } from "../../utils/validators.js";

// Valida que un hash de PIN sea válido (bcrypt)
function validateHashedPin(hash) {
  if (!isNonEmptyString(hash)) throw new ErrorIncorrectParam("PIN vacío");
  if (hash.length !== 60 || !hash.startsWith("$2")) {
    throw new ErrorIncorrectParam("PIN inválido");
  }
}

export function validateCreateUser(req, res, next) {
  try {
    const { nombre, pin } = req.body;
    if (!isNonEmptyString(nombre)) {
      throw new ErrorIncorrectParam(
        "El campo 'nombre' es obligatorio y debe ser un string no vacío"
      );
    }
    validateHashedPin(pin);
    next();
  } catch (error) {
    next(error);
  }
}

export function validateUpdateUser(req, res, next) {
  try {
    const { nombre, pin } = req.body;
    if (nombre !== undefined && !isNonEmptyString(nombre)) {
      throw new ErrorIncorrectParam(
        "Si se envía, el campo 'nombre' debe ser un string no vacío"
      );
    }
    if (pin !== undefined) {
      validateHashedPin(pin);
    }
    if (nombre === undefined && pin === undefined) {
      throw new ErrorIncorrectParam(
        "Debes enviar al menos un campo para actualizar"
      );
    }
    next();
  } catch (error) {
    next(error);
  }
}
