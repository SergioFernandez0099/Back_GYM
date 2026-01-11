import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Determinar qué archivo .env cargar según NODE_ENV
const envFile = process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env';

// Cargar el archivo correspondiente
const envPath = path.resolve(__dirname, '../../', envFile);
dotenv.config({ path: envPath });

console.log(`📁 Cargando configuración desde: ${envFile}`);

export const configApp = {
  // Entorno
  env: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT) || 5555,
  host: process.env.HOST || '0.0.0.0',

  // Base de datos (ya no se necesita aquí, está en DATABASE_URL)
  database: {
    url: process.env.DATABASE_URL,
  },

  // JWT
  jwt: {
    secret: process.env.JWT_SECRET || 'tu-secret-super-secreto-cambiar-en-produccion',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },

  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,

  // Rate limiting
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: process.env.NODE_ENV === 'production' ? 200 : 300,
  },

  // CORS
  cors: {
    origin: process.env.CORS_ORIGIN?.split(',') || [
      'http://localhost:5173',
      'http://127.0.0.1:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
}
