"use strict";

var fs = require( "fs" );
var path = require( "path" );

require( "colors" );

require( "string.prototype.endswith" );

var loadedHelpers = {};

module.exports.setup = function( app ) {
	var files = fs.readdirSync( __dirname );

	files.filter( function(file) {
		return file.endsWith(".js") && file !== path.basename( __filename );
	} ).forEach( function( file ) {

        console.log( "Loading helpers from " + file.green );

		var helpers = require( "./" + file );

        for( var name in helpers ) {
            if( helpers.hasOwnProperty(name) ) {
                if( name in loadedHelpers ) {
                    throw new Error( "Duplicate helper definition: " + name );
                } else {
                    loadedHelpers[name] = helpers[name];
                }
            }
        }
	} );
};

module.exports.getHelpers = function() {
    return loadedHelpers;
};
