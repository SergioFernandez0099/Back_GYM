import fs from "fs";
import path from "path";
import morgan from "morgan";

// Carpeta de logs
const logDirectory = path.join(process.cwd(), "logs");
if (!fs.existsSync(logDirectory)) fs.mkdirSync(logDirectory);

// Stream de Morgan
const accessLogStream = fs.createWriteStream(
  path.join(logDirectory, "access.log"),
  { flags: "a" }
);

export const loggerMiddleware = morgan(
   ":date[iso] :remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms :user-agent",
  { stream: accessLogStream }
);