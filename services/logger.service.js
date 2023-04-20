const winston = require("winston");
const dotenv = require("dotenv");
dotenv.config();

const dateFormat = () => new Date(Date.now()).toLocaleDateString();

class LoggerService {
  constructor(route) {
    this.route = route;
    this.logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "error.log", level: "error" }),
        new winston.transports.File({ filename: "combined.log" }),
      ],
    });
  }

  info(message) {
    this.logger.log("info", message);
  }

  warn(message) {
    this.logger.log("warn", message);
  }

  error(message) {
    this.logger.log("error", message);
  }
}

module.exports = LoggerService;
