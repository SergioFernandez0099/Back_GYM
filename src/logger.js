import {createLogger, format, transports} from "winston";
import "winston-daily-rotate-file";

// Transporte para archivos rotativos diarios
const dailyRotateTransport = new transports.DailyRotateFile({
    filename: "logs/app-%DATE%.log", // archivo diario
    datePattern: "YYYY-MM-DD",
    zippedArchive: true,  // comprime los archivos antiguos
    maxSize: "10m",       // máximo 10 MB por archivo
    maxFiles: "30d"       // conserva logs 30 días
});

// Logger principal
export const logger = createLogger({
    level: "info", // nivel mínimo que se registrará
    format: format.combine(
        format.timestamp({format: "YYYY-MM-DD HH:mm:ss"}),
        format.json() // logs en JSON, profesional y listo para ELK
    ),
    transports: [
        dailyRotateTransport,
        new transports.Console({format: format.simple()}) // para desarrollo
    ]
});
