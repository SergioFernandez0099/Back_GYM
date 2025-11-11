import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import { generateToken } from "../auth/jwt.js"; // tu módulo profesional de JWT

export const loginUser = async (req, res, next) => {
  try {
    const { name, pin } = req.body;

    if (!name || !pin) {
      const error = new Error("NAME y PIN son obligatorios");
      error.statusCode = 400;
      throw error;
    }

    // Buscar usuario por email
    const user = await prisma.user.findUnique({
      where: { name },
      select: { id: true, name: true,  pin: true },
    });

    if (!user) {
      const error = new Error("PIN incorrecto");
      error.statusCode = 401;
      throw error;
    }

    // Comparar el PIN enviado con el hash almacenado
    const isValid = await bcrypt.compare(pin, user.pin);
    if (!isValid) {
      const error = new Error("PIN incorrecto");
      error.statusCode = 401;
      throw error;
    }

    // ✅ Generar JWT profesional
    const token = generateToken({ userId: user.id, name: user.name });

    // ✅ Guardar token en cookie HttpOnly
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,         // true en producción (HTTPS)
      sameSite: "lax",     // necesario si frontend está en otro dominio (none con true) (lax con false)
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 días
    });

    // ✅ Devolver solo info segura del usuario
    res.status(200).json({
      message: "Autenticación correcta",
      user: {
        id: user.id,
        name: user.name,
      },
    });

  } catch (error) {
    next(error);
  }
};
