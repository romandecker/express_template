/**
 * @file Main entry point for the application. Registers routes, models,
 * controllers and views.
 */

"use strict";

require( "string.prototype.endswith" );

var express = require( "express" );
var bodyParser = require( "body-parser" );
var config = require( "config" );
var knex = require( "knex" )( config.get( "db" ) );
var fs = require( "fs" );

var routes = require( "./app/routes" );
var models = require( "./app/models/models" );
var controllers = require( "./app/controllers/controllers" );

var bookshelf = require( "bookshelf" )( knex );

var app = express();
app.set( "bookshelf", bookshelf );

app.use( config.get("logger") );
app.use( bodyParser.json() );

models.setup( app );
app.set( "models", models );

controllers.setup( app );
app.set( "controllers", controllers );

app.set( "views", "app/views" );
app.set( "view engine", "ejs" );

app.locals.ngControllers = fs.readdirSync( "app/public/controllers" )
                             .filter( function(file) {
    return file.endsWith(".js");
} );
app.locals.ngServices = fs.readdirSync( "app/public/services" )
                             .filter( function(file) {
    return file.endsWith(".js");
} );
app.locals.ngViews = fs.readdirSync( "app/public/views" )
                             .filter( function(file) {
    return file.endsWith(".html");
} );
app.locals.ngDirectives = fs.readdirSync( "app/public/directives" )
                             .filter( function(file) {
    return file.endsWith(".js");
} );

routes.setup( app );

app.locals.appinfo = {
    environment: {
		development: process.env.NODE_ENV === "development",
		production: process.env.NODE_ENV === "production",
		test: process.env.NODE_ENV === "test"
	}
};

var server = app.listen( 3000, function() {
	console.log( "Listening on port %d", server.address().port );
} );
