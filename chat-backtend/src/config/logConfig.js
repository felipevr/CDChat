//copiar (pegar pronto)
const winston = require('winston')
const expressWinston = require('express-winston')

module.exports = {
    getLogger: function () {
        return expressWinston.logger({
            transports: [
                new winston.transports.File({
                    filename: 'log/server.log'
                })
            ],
            format: winston.format.combine(
                winston.format.simple()
            ),
            statusLevels: true,
            skip: function(req, res) {
                return res.statusCode == 200;
            },
            meta: true,
            msg: "HTTP {{req.method}} {{req.url}}",
            expressFormat: false,
            colorize: false,
            ignoreRoute: function(req, res) {
                return false;
            }
        });
    },
    getErrorLogger: function() {
        return expressWinston.logger({
            transports: [
                new winston.transports.File({
                    filename: 'log/error.log',
                    level: 'error'
                })
            ],
            format: winston.format.combine(
                winston.format.simple()
            ),
        });
    },
}