import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const configApp = {
  port: process.env.PORT,
  version: process.env.VERSION,
  host: process.env.HOST,
  databaseUrl: process.env.DATABASE_URL,
  frontendUrl: process.env.FRONTEND_URL,
  bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10,
};
export const jwt = {
  jwtSecret: process.env.JET_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "7d",
};
