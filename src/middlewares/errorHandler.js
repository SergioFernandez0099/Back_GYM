import respuesta from "../utils/responses.js";
import {
    ErrorAccesoDenegado,
    ErrorAutenticacion,
    ErrorIncorrectParam,
    ErrorRegisterNotFound,
    ErrorSolicitud,
} from "../errors/businessErrors.js";
import {handlePrismaError} from "../errors/prismaErrors.js";
import {loggers} from "../logger.js";

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
        loggers.warn("Error de negocio", {
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            method: req.method,
            url: req.url,
            ip: req.ip,
            userId: req.user?.id
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
        loggers.error("Error de Prisma", {
            message: err.message,
            stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
            method: req.method,
            url: req.url,
            ip: req.ip,
            userId: req.user?.id
        });
        return respuesta.error(res, prismaErr.message, prismaErr.statusCode);
    }

    // Error genérico
    loggers.error("Error interno", {
        message: err.message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        method: req.method,
        url: req.url,
        ip: req.ip,
        userId: req.user?.id
    });

    const mensaje = err.message || "Error interno";
    const estado = err.statusCode || 500;
    return respuesta.error(res, mensaje, estado);
}
