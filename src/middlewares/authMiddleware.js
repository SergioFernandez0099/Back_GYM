import {verifyToken} from "../auth/jwt.js";

export function authenticateAndAuthorize(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({message: "No autorizado"});
    }

    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({message: "Token inválido o expirado"});
    }

    const requestedUserId = Number(req.params.id);
    if (decoded.userId !== requestedUserId) {
        return res.status(403).json({message: "No tienes permiso"});
    }

    req.userId = decoded.userId;
    next();
}

export function authenticate(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({message: "No autorizado"});
    }
    const decoded = verifyToken(token);
    if (!decoded) {
        return res.status(401).json({message: "Token inválido o expirado"});
    }
    req.userId = decoded.userId;
    next();
}
