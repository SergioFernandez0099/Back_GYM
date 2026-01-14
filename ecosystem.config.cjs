module.exports = {
    apps: [{
        name: 'gym-api',
        script: './src/server.js',
        instances: '3',
        exec_mode: 'cluster',

        env_production: {
            NODE_ENV: 'production',
            PORT: 3000,
            LOG_LEVEL: 'info',  // ← Nivel de log en producción
        },

        // PM2 logs separados de Winston logs
        error_file: './logs/pm2-error.log',
        out_file: './logs/pm2-out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
        merge_logs: true,

        // Rotación de logs de PM2 (instalar pm2-logrotate)
        // pm2 install pm2-logrotate

        autorestart: true,
        max_memory_restart: '500M',
        kill_timeout: 5000,
    }]
};