import morgan from "morgan";
import {logger} from "../logger.js";

export const loggerMiddleware = morgan(
    ":date[iso] :remote-addr :remote-user :method :url :status :res[content-length] - :response-time ms :user-agent",
    {
        stream: {
            write: (message) => logger.info(message.trim())
        }
    }
);
