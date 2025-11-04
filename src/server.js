import express from "express";
import cors from "cors";
import { loggerMiddleware } from "./middlewares/logger.js";
import usersRoutes from "./routes/users.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { configApp } from "./config/config.js";
import { errorHandler } from "./middlewares/errorHandler.js";


const app = express();

const PORT = configApp.port || 5555;
const HOST = configApp.host || "127.0.0.1";

app.use(express.json());
app.use(cors());

// Middleware de logging
app.use(loggerMiddleware);

// Rutas
app.use('login', authRoutes)
app.use('/api/users', usersRoutes);

// Error handler
app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`Servidor activo en http://${HOST}:${PORT}`);
  console.log(`Acceso en red local: http://<TU_IP_LOCAL>:${PORT}`);
});

/*
 ______     ____  __                    __   __
|  _ \ \   / /  \/  |   /\        /\    \ \ / /
| |_) \ \_/ /| \  / |  /  \      /  \    \ V / 
|  _ < \   / | |\/| | / /\ \    / /\ \    > <  
| |_) | | |  | |  | |/ ____ \  / ____ \  / . \ 
|____/  |_|  |_|  |_/_/    \_\/_/    \_\/_/ \_\

*/
