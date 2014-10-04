var winston = require( "winston" );
var expressWinston = require( "express-winston" );

module.exports = {
    logger: expressWinston.logger( {
        transports: [
            new winston.transports.Console( {
                colorize: true
            } )
        ]
    } )
};
