import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const configApp = {
    port: process.env.PORT,
    version: process.env.VERSION,
    host: process.env.HOST
};
export const jwt = {
    secret: process.env.JET_SECRET,
};
export const mysql = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
};
