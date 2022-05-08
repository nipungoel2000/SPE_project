const winston = require('winston');

const logConfig = {
    'transports': [
        new winston.transports.File({
            filename: './caretaker.log'
        })
    ],
    format: winston.format.combine(

        winston.format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        //${info.level}: ${info.label}:
        winston.format.printf(info => `${[info.timestamp]}, ${info.level}, ${info.message}`),
    )
};
const logger = winston.createLogger(logConfig);
module.exports = logger;