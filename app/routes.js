/*
 *
 *
 */
"use strict";

var express = require( "express" );
var path = require( "path" );

/* does stuff */
module.exports.setup = function( app ) {

    var controllers = app.get( "controllers" );
	
    app.use( "/public", express.static(path.join(__dirname, "public")) );

    app.get( "/users", controllers.UserController.index );
    app.get( "/users/delete", controllers.UserController.deleteAll );
};
