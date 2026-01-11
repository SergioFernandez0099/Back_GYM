export const databaseConfig = {
    // Configuración de pool
    pool: {
        min: parseInt(process.env.DB_POOL_MIN) || 2,
        max: parseInt(process.env.DB_POOL_MAX) || 20,
        idleTimeout: 30000,
        acquireTimeout: 20000,
    },

    // Configuración de conexión
    connection: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        database: process.env.DB_NAME || 'gyma',
        user: process.env.DB_USER || 'postgres',
    },

    // Flags
    ssl: process.env.NODE_ENV === 'production',
    logging: process.env.NODE_ENV === 'development',
}