import morgan from "morgan";
import { logger, loggers } from "../logger.js";

// Token personalizado para obtener user ID (si está autenticado)
morgan.token('user-id', (req) => {
    return req.user?.id || 'anonymous';
});

// Token para request body size
morgan.token('body-size', (req) => {
    return JSON.stringify(req.body).length || 0;
});

// Formato según entorno
const morganFormat = process.env.NODE_ENV === 'production'
    ? ':remote-addr - :user-id [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] - :response-time ms ":user-agent"'
    : ':method :url :status :response-time ms - :res[content-length] bytes';

// Stream para winston
const morganStream = {
    write: (message) => {
        // Remover salto de línea que añade morgan
        const cleanMessage = message.trim();

        // Parsear el log para extraer información
        const parts = cleanMessage.split(' ');
        const method = parts[0];
        const status = parseInt(parts[2]) || 0;

        // Nivel de log según status code
        if (status >= 500) {
            logger.error(cleanMessage, { type: 'http', method, status });
        } else if (status >= 400) {
            logger.warn(cleanMessage, { type: 'http', method, status });
        } else {
            logger.http(cleanMessage, { type: 'http', method, status });
        }
    }
};

// Middleware de Morgan
export const loggerMiddleware = morgan(morganFormat, {
    stream: morganStream,

    // Skipear health checks en producción (para no llenar logs)
    skip: (req, res) => {
        return process.env.NODE_ENV === 'production' && req.url === '/health';
    }
});

// Middleware adicional para logging de requests sospechosos
export const securityLogger = (req, res, next) => {
    // Log de requests con body muy grande
    // Asegurarse de que req.body existe
    const safeBody = req.body ?? {}; // si es undefined, usar objeto vacío
    const bodySize = JSON.stringify(safeBody).length;
    if (bodySize > 1000000) { // 1MB
        loggers.security('Large request body detected', {
            ip: req.ip,
            method: req.method,
            url: req.url,
            bodySize: `${(bodySize / 1024 / 1024).toFixed(2)} MB`,
        });
    }

    // Log de intentos de acceso a rutas admin sin auth
    if (req.url.includes('/admin') && !req.user) {
        loggers.security('Unauthorized admin access attempt', {
            ip: req.ip,
            url: req.url,
            userAgent: req.get('user-agent'),
        });
    }

    next();
};