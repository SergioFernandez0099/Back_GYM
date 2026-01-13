import "dotenv/config";
import {PrismaPg} from '@prisma/adapter-pg'
import {PrismaClient} from "../generated/prisma/client.js";

import {logger, loggers} from '../logger.js';

// Configuración de logs según entorno
const logConfig = process.env.NODE_ENV === 'development'
    ? [
        {level: 'query', emit: 'event'},
        {level: 'error', emit: 'event'},
        {level: 'warn', emit: 'event'},
    ]
    : [
        {level: 'error', emit: 'event'},
        {level: 'warn', emit: 'event'},
    ];

// Singleton global
const globalForPrisma = globalThis;

// Configuración del pool de conexiones
const connectionString = `${process.env.DATABASE_URL}`

const adapter = new PrismaPg({connectionString})

const prisma = globalForPrisma.prisma || new PrismaClient({
    adapter: adapter,
    log: logConfig,
});

// Event listeners para integrar con Winston

// Queries (solo desarrollo)
if (process.env.NODE_ENV === 'development') {
    prisma.$on('query', (e) => {
        // Log de queries lentas
        if (e.duration > 1000) {
            loggers.slowQuery(e.query, e.duration, {
                params: e.params,
                target: e.target,
            });
        } else {
            // Queries normales a nivel debug
            logger.debug('Prisma query', {
                query: e.query.substring(0, 100),
                duration: `${e.duration}ms`,
            });
        }
    });
}

// // Errores de Prisma
// prisma.$on('error', (e) => {
//     loggers.error('Prisma error event', {
//         message: e.message,
//         target: e.target,
//     });
// });
//
// // Warnings
// prisma.$on('warn', (e) => {
//     logger.warn('Prisma warning', {
//         message: e.message,
//         target: e.target,
//     });
// });

// Guardar instancia en desarrollo
if (process.env.NODE_ENV !== 'production') {
    globalForPrisma.prisma = prisma;
}

// Conexión inicial
async function connectDatabase() {
    try {
        await prisma.$connect();

        // Verificar versión de PostgreSQL
        const result = await prisma.$queryRaw`SELECT version()`;
        const version = result[0].version.split(' ')[1];

        logger.info('Prisma connected to PostgreSQL', {
            version,
            poolConfig: {
                min: process.env.DB_POOL_MIN || 2,
                max: process.env.DB_POOL_MAX || 20,
            },
        });
    } catch (error) {
        loggers.error('Failed to connect Prisma', error);
        process.exit(1);
    }
}

connectDatabase();

// Graceful disconnect
process.on('beforeExit', async () => {
    await prisma.$disconnect();
    logger.info('Prisma disconnected');
});

export default prisma;