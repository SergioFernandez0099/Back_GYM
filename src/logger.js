/**
 * Sistema de logging centralizado con Winston
 * - Rotación diaria de archivos
 * - Diferentes niveles según entorno
 * - Formato JSON para producción
 */

import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import path from "path";

// Nivel de log según entorno
const logLevel = process.env.LOG_LEVEL || (
    process.env.NODE_ENV === 'production' ? 'info' : 'debug'
);

// Formato para desarrollo (legible en consola)
const devFormat = format.combine(
    format.colorize(),
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.printf(({ timestamp, level, message, ...meta }) => {
        let log = `${timestamp} [${level}]: ${message}`;
        if (Object.keys(meta).length > 0) {
            log += ` ${JSON.stringify(meta)}`;
        }
        return log;
    })
);

// Formato para producción (JSON estructurado)
const prodFormat = format.combine(
    format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    format.errors({ stack: true }),
    format.json()
);

// Transporte para archivos rotativos diarios
const dailyRotateTransport = new transports.DailyRotateFile({
    filename: "logs/app-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,        // Comprime logs antiguos
    maxSize: "20m",             // Máximo 20 MB por archivo
    maxFiles: "30d",            // Conserva 30 días
    level: logLevel,
});

// Transporte separado para ERRORES (importante en producción)
const errorRotateTransport = new transports.DailyRotateFile({
    filename: "logs/error-%DATE%.log",
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,
    maxSize: "20m",
    maxFiles: "90d",            // Errores se guardan 90 días
    level: "error",             // Solo errores
});

// Transporte de consola
const consoleTransport = new transports.Console({
    format: process.env.NODE_ENV === 'production' ? prodFormat : devFormat,
    level: logLevel,
});

// Crear logger
export const logger = createLogger({
    level: logLevel,
    format: prodFormat,
    defaultMeta: {
        service: 'gym-api',
        environment: process.env.NODE_ENV || 'development',
    },
    transports: [
        dailyRotateTransport,
        errorRotateTransport,
        consoleTransport,
    ],

    // No salir en caso de error de logging
    exitOnError: false,
});

// Eventos del transporte rotativo (para debugging)
dailyRotateTransport.on('rotate', (oldFilename, newFilename) => {
    logger.info('Log file rotated', { oldFilename, newFilename });
});

// Helper functions para logging estructurado
export const loggers = {
    // HTTP requests (usado por morgan)
    http: (message, meta = {}) => logger.http(message, meta),

    // Información general
    info: (message, meta = {}) => logger.info(message, meta),

    // Warnings
    warn: (message, meta = {}) => logger.warn(message, meta),

    // Errores
    error: (message, error = null) => {
        if (error instanceof Error) {
            logger.error(message, {
                error: error.message,
                stack: error.stack,
                ...error,
            });
        } else {
            logger.error(message, error || {});
        }
    },

    // Debug (solo desarrollo)
    debug: (message, meta = {}) => logger.debug(message, meta),

    // Queries de base de datos lentas
    slowQuery: (query, duration, meta = {}) => {
        logger.warn('Slow database query detected', {
            query: query.substring(0, 200), // Primeros 200 chars
            duration: `${duration}ms`,
            ...meta,
        });
    },

    // Eventos de seguridad
    security: (event, meta = {}) => {
        logger.warn('Security event', {
            event,
            timestamp: new Date().toISOString(),
            ...meta,
        });
    },
};

// Logging de inicio de aplicación
logger.info('Logger initialized', {
    level: logLevel,
    environment: process.env.NODE_ENV,
    transports: ['daily-rotate-file', 'error-file', 'console'],
});