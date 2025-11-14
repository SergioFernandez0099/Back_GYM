import express from "express";
import cors from "cors";
import {loggerMiddleware} from "./middlewares/logger.js";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import exercisesRoutes from "./routes/exercises.routes.js";
import muscleGroupsRoutes from "./routes/muscleGroups.routes.js";
import {configApp} from "./config/config.js";
import {errorHandler} from "./middlewares/errorHandler.js";
import os from "os"; // Importamos para obtener la IP local
import cookieParser from "cookie-parser";


const app = express();

const PORT = configApp.port || 5555;
const HOST = configApp.host || "0.0.0.0";

app.use(express.json());
app.use(cookieParser())
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "http://192.168.1.153:5173",
            "http://192.168.1.246:5173",
            "http://172.16.0.2:5173",
            "http://172.17.96.1:5173",
            "http://10.58.40.20:5173",
            "http://10.58.40.48:5173",
            "http://10.58.41.11:5173"
        ],
        //  origin: true, // permite cualquier origen
        credentials: true, // permite enviar cookies
    })
);


// Middleware de logging
app.use(loggerMiddleware);

// Rutas
app.use("/api/auth", authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/exercises', exercisesRoutes);
app.use('/api/muscleGroups', muscleGroupsRoutes);

// Error handler
app.use(errorHandler);

// Función para obtener la IP local
function getLocalIP() {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }
    return '127.0.0.1';
}

app.listen(PORT, HOST, () => {
    const localIP = getLocalIP();
    console.log(`Servidor activo en http://${HOST}:${PORT}`);
    console.log(`Acceso en red local: http://${localIP}:${PORT}`);
});

/*
 ______     ____  __                    __   __
|  _ \ \   / /  \/  |   /\        /\    \ \ / /
| |_) \ \_/ /| \  / |  /  \      /  \    \ V / 
|  _ < \   / | |\/| | / /\ \    / /\ \    > <  
| |_) | | |  | |  | |/ ____ \  / ____ \  / . \ 
|____/  |_|  |_|  |_/_/    \_\/_/    \_\/_/ \_\

*/
