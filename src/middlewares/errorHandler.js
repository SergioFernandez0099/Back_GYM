import respuesta from "../utils/responses.js";
import {
    ErrorAccesoDenegado,
    ErrorAutenticacion,
    ErrorIncorrectParam,
    ErrorRegisterNotFound,
    ErrorSolicitud,
} from "../errors/businessErrors.js";
import {handlePrismaError} from "../errors/prismaErrors.js";
import {logger} from "../logger.js";

export function errorHandler(err, req, res, next) {

    // 1️⃣ Errores de parsing JSON de express.json()
    if (err.type === "entity.parse.failed") {
        return respuesta.error(res, "JSON inválido en el body", 400);
    }

    // Errores de negocio
    if (
        err instanceof ErrorAutenticacion ||
        err instanceof ErrorAccesoDenegado ||
        err instanceof ErrorSolicitud ||
        err instanceof ErrorIncorrectParam ||
        err instanceof ErrorRegisterNotFound
    ) {
        logger.warn("Error de negocio", {
            type: err.constructor.name,
            message: err.message,
            path: req.path,
            method: req.method,
            user: req.userId || null
        });

        let status = 500;
        switch (err.constructor) {
            case ErrorAutenticacion:
                status = respuesta.HTTP_UNAUTHORIZED;
                break;
            case ErrorAccesoDenegado:
                status = respuesta.HTTP_FORBIDDEN;
                break;
            case ErrorSolicitud:
            case ErrorIncorrectParam:
                status = respuesta.HTTP_BAD_REQUEST;
                break;
            case ErrorRegisterNotFound:
                status = respuesta.HTTP_NOT_FOUND;
                break;
        }
        return respuesta.error(res, err.message, status);
    }

    // Errores de Prisma
    const prismaErr = handlePrismaError(err);
    if (prismaErr) {
        logger.error("Error de Prisma", {
            message: prismaErr.message,
            code: prismaErr.code,
            path: req.path,
            method: req.method,
            user: req.user || null
        });
        return respuesta.error(res, prismaErr.message, prismaErr.statusCode);
    }

    // Error genérico
    logger.error("Error interno", {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method,
        body: req.body,
        user: req.user || null
    });

    const mensaje = err.message || "Error interno";
    const estado = err.statusCode || 500;
    return respuesta.error(res, mensaje, estado);
}
