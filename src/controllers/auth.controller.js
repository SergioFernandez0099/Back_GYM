import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import {generateToken, verifyToken} from "../auth/jwt.js";
import respuesta from "../utils/responses.js";
import {ErrorAutenticacion} from "../errors/businessErrors.js"; // tu módulo profesional de JWT

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
};


export const loginUser = async (req, res, next) => {
    try {
        const {name, pin} = req.body;

        if (!name || !pin) {
            const error = new Error("NAME y PIN son obligatorios");
            error.statusCode = 400;
            throw error;
        }

        // Buscar usuario por email
        const user = await prisma.user.findUnique({
            where: {name},
            select: {id: true, name: true, pin: true},
        });

        if (!user) throw new ErrorAutenticacion("Credenciales incorrectas");

        // Comparar el PIN enviado con el hash almacenado
        const isValid = await bcrypt.compare(pin, user.pin);
        if (!isValid) throw new ErrorAutenticacion("Credenciales incorrectas");

        // ✅ Generar JWT profesional
        const token = generateToken({userId: user.id, name: user.name});

        // ✅ Guardar token en cookie HttpOnly
        res.cookie("token", token, cookieOptions);

        // ✅ Devolver solo info segura del usuario
        respuesta.success(res, {
            user: {
                id: user.id,
                name: user.name,
            }
        })
    } catch (error) {
        next(error);
    }
};

export const logout = async (req, res, next) => {
    try {
        // ✅ Borrar la cookie del token
        res.clearCookie("token", {
            httpOnly: true,
            secure: false, // true en producción con HTTPS
            sameSite: "lax",
        });

        res.status(200).json({message: "Sesión cerrada correctamente"});
    } catch (error) {
        next(error);
    }
};

export const validateToken = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({message: "No token"});
        }

        res.set("Cache-Control", "no-store");
        // Usando tu módulo JWT
        const decoded = verifyToken(token); // función de tu módulo auth/jwt.js
        if (!decoded) return res.status(401).json({message: "Token inválido"});
        res.status(200).json({userId: decoded.userId, name: decoded.name});
    } catch (err) {
        res.status(401).json({message: "Token inválido"});
    }
};
