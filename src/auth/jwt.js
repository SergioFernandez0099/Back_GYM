// src/auth/jwt.js
import jwt from "jsonwebtoken";
import { configApp } from "../config/config.js";

const JWT_SECRET = configApp.jwtSecret || "super_secret_key"; // mejor usar variable de entorno
const JWT_EXPIRES_IN = "7d"; // tiempo de expiración

export function generateToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
