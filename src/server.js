import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";
import os from "os";
import cookieParser from "cookie-parser";

// Config
import {configApp} from "./config/config.js";
import prisma from "./prisma/client.js";

// Logging
import {logger, loggers} from "./logger.js";
import {loggerMiddleware, securityLogger} from "./middlewares/loggerMiddleware.js";

// Middlewares
import {errorHandler} from "./middlewares/errorHandler.js";

// Rutas
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import muscleGroupsRoutes from "./routes/muscleGroups.routes.js";

const app = express();
const PORT = configApp.port;
const HOST = configApp.host;

app.use(helmet({
    // Content Security Policy - Define qué recursos puede cargar tu app
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],  // Por defecto, solo recursos de tu dominio
            scriptSrc: [
                "'self'",  // Scripts de tu dominio
                // Añade aquí CDNs que uses:
                // "https://cdn.jsdelivr.net",
                // "https://unpkg.com",
            ],
            styleSrc: [
                "'self'",
                "'unsafe-inline'"  // Permite estilos inline (ej: style="color: red")
            ],
            imgSrc: [
                "'self'",
                "data:",  // Permite imágenes en base64
                "https:"  // Permite imágenes de cualquier HTTPS
            ],
            connectSrc: ["'self'"],  // APIs a las que puede conectarse
            fontSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],  // Bloquea <object>, <embed>
            mediaSrc: ["'self'"],
            frameSrc: ["'none'"],  // Bloquea iframes
        },
    },

    // Cross-Origin-Embedder-Policy - Controla recursos de otros orígenes
    crossOriginEmbedderPolicy: false,  // Desactivar si cargas recursos externos

    // Cross-Origin-Resource-Policy
    crossOriginResourcePolicy: {policy: "cross-origin"},

    // Strict-Transport-Security - Solo HTTPS (desactivar en desarrollo)
    // hsts: {
    //     maxAge: 31536000,  // 1 año
    //     includeSubDomains: true,
    //     preload: true
    // },

    // X-Frame-Options - Previene clickjacking
    frameguard: {
        action: 'deny'  // o 'sameorigin' si necesitas iframes de tu dominio
    },

    // X-Content-Type-Options
    noSniff: true,

    // Referrer-Policy
    referrerPolicy: {
        policy: 'strict-origin-when-cross-origin'
    },
}));

// COMPRESSION - Comprime las respuestas
app.use(compression());

const limiter = rateLimit({
    windowMs: configApp.rateLimit.windowMs,
    max: configApp.rateLimit.max,
    message: "Demasiadas peticiones desde esta IP, intenta de nuevo más tarde",
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req) => {
        loggers.security('Rate limit exceeded', {
            ip: req.ip,
            url: req.url,
        });
    },
});

const authLimiter = rateLimit({
    windowMs: configApp.rateLimit.windowMs,
    max: 15, // Máximo 15 intentos de login
    message: "Demasiados intentos de autenticación, intenta de nuevo más tarde",
    skipSuccessfulRequests: true, // No cuenta requests exitosos
    handler: (req) => {
        loggers.security('Auth rate limit exceeded', {
            ip: req.ip,
            attempts: 15,
        });
    },
});

app.use(limiter);

// 4. Body parser con límites de tamaño
app.use(express.json({limit: '10mb'})); // Limita el tamaño del body
app.use(express.urlencoded({extended: true, limit: '10mb'}));
app.use(cookieParser())

app.use(cors(configApp.cors));

// Logging HTTP + Security
app.use(loggerMiddleware);
app.use(securityLogger);

// Health check
app.get('/health', async (req, res) => {
    try {
        const dbCheck = await prisma.$queryRaw`SELECT NOW() as time, version()`;

        res.status(200).json({
            status: 'ok',
            timestamp: new Date().toISOString(),
            uptime: Math.floor(process.uptime()),
            environment: process.env.NODE_ENV,
            database: {
                status: 'connected',
                serverTime: dbCheck[0].time,
                version: dbCheck[0].version.split(' ')[1],
            },
        });
    } catch (error) {
        loggers.error('Health check failed', error);
        res.status(503).json({
            status: 'error',
            database: {status: 'disconnected'},
        });
    }
});

// Rutas
app.use("/api/auth", authLimiter, authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/muscleGroups', muscleGroupsRoutes);

// Manejo de rutas no encontradas
app.use((req, res) => {
    res.status(404).json({
        ok: false,
        message: 'Ruta no encontrada'
    });
});

// Error handler
app.use(errorHandler);

//  Manejo de errores no capturados
process.on('uncaughtException', async (error) => {
    loggers.error('Uncaught Exception - shutting down', error);
    await prisma.$disconnect();
    process.exit(1);
});

process.on('unhandledRejection', async (reason, promise) => {
    loggers.error('Unhandled Rejection', {
        reason,
        promise: promise.toString(),
    });
    await prisma.$disconnect();
    process.exit(1);
});

//  Graceful shutdown
async function gracefulShutdown(signal) {
    logger.info(`${signal} received, shutting down gracefully`);
    try {
        await prisma.$disconnect();
        logger.info('Prisma disconnected successfully');
        process.exit(0);
    } catch (error) {
        loggers.error('Error during shutdown', error);
        process.exit(1);
    }
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Función para obtener la IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

app.listen(PORT, HOST, () => {
    const localIP = getLocalIP();

    logger.info('Server started successfully', {
        environment: process.env.NODE_ENV,
        host: HOST,
        port: PORT,
        localIP,
        endpoints: {
            local: `http://${HOST}:${PORT}`,
            network: `http://${localIP}:${PORT}`,
            health: `http://${localIP}:${PORT}/health`,
        },
    });

    // Log adicional en consola para desarrollo
    if (process.env.NODE_ENV === 'development') {
        console.log(`\n🚀 Servidor iniciado`);
        console.log(`   Local:   http://${HOST}:${PORT}`);
        console.log(`   Red:     http://${localIP}:${PORT}`);
        console.log(`   Health:  http://${localIP}:${PORT}/health\n`);
    }
});

/*
 ______     ____  __                    __   __
|  _ \ \   / /  \/  |   /\        /\    \ \ / /
| |_) \ \_/ /| \  / |  /  \      /  \    \ V / 
|  _ < \   / | |\/| | / /\ \    / /\ \    > <  
| |_) | | |  | |  | |/ ____ \  / ____ \  / . \ 
|____/  |_|  |_|  |_/_/    \_\/_/    \_\/_/ \_\

*/
