// src/auth/jwt.js
import jwt from "jsonwebtoken";
import { configApp } from "../config/config.js";

const JWT_SECRET = configApp.jwt.secret;
const JWT_EXPIRES_IN = configApp.jwt.expiresIn;

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
