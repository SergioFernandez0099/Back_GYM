import { Prisma } from '../generated/prisma/client.js';

export function handlePrismaError(err) {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002":
        return { message: "Registro duplicado", statusCode: 400 };
      case "P2003":
        return { message: "Error de clave foránea", statusCode: 400 };
      case "P2025":
        return { message: "Registro no encontrado", statusCode: 404 };
      default:
        return { message: "Error de base de datos", statusCode: 500 };
    }
  }
  if (err instanceof Prisma.PrismaClientValidationError) {
    return { message: "Error de validación en la consulta", statusCode: 400 };
  }
  if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    return { message: "Error desconocido de base de datos", statusCode: 500 };
  }
  return null; // no es un error de Prisma
}
