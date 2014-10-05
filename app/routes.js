/*
 *
 *
 */
"use strict";

/* does stuff */
module.exports.setup = function( app ) {

    var controllers = app.get( "controllers" );
	
    app.get( "/users", controllers.UserController.index );
    app.get( "/users/delete", controllers.UserController.deleteAll );
    
};
