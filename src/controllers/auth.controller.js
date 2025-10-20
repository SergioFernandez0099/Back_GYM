import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
// import { generateToken } from "../auth/auth.js";

export const loginUser = async (req, res, next) => {
//   try {
//     const { email, pin } = req.body;

//     if (!email || !pin) {
//       const error = new Error("Email y PIN son obligatorios");
//       error.statusCode = 400;
//       throw error;
//     }

//     // Buscar usuario por email
//     const user = await prisma.user.findUnique({
//       where: { email },
//       select: { id: true, nombre: true, email: true, pin: true },
//     });

//     if (!user) {
//       const error = new Error("Email o PIN incorrecto");
//       error.statusCode = 401;
//       throw error;
//     }

//     // Comparar el PIN enviado con el hash almacenado
//     const isValid = await bcrypt.compare(pin, user.pin);
//     if (!isValid) {
//       const error = new Error("Email o PIN incorrecto");
//       error.statusCode = 401;
//       throw error;
//     }

//     // Generar JWT
//     const token = generateToken({ id: user.id, email: user.email });

//     // Devolver respuesta segura (no enviamos el pin)
//     res.status(200).json({
//       message: "Autenticación correcta",
//       user: {
//         id: user.id,
//         nombre: user.nombre,
//         email: user.email,
//       },
//       token,
//     });
//   } catch (error) {
//     next(error);
//   }
};
