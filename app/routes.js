/*
 *
 *
 */
"use strict";

var express = require( "express" );
var path = require( "path" );

/* does stuff */
module.exports.setup = function( app ) {

    var router = express.Router();
    var controllers = app.get( "controllers" );
	
    app.use( "/public", express.static(path.join(__dirname, "public")) );

    router.get( "/", function( req, res ) {
        res.render( "index" );
    } );

    router.get( "/users", controllers.UserController.index );
    router.get( "/users/:id", controllers.UserController.get );
    router.post( "/users/:id", controllers.UserController.create );
    router.delete( "/users/:id", controllers.UserController.destroy );

    app.use( router );
};
