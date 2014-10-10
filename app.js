/**
 * @file Main entry point for the application. Registers routes, models,
 * controllers and views.
 */

"use strict";

var express = require( "express" );
var config = require( "config" );
var knex = require( "knex" )( config.get( "db" ) );
var handlebars = require( "express-handlebars" );

var routes = require( "./app/routes" );
var models = require( "./app/models/models" );
var controllers = require( "./app/controllers/controllers" );

var bookshelf = require( "bookshelf" )( knex );

var app = express();
app.set( "bookshelf", bookshelf );

app.use( config.get("logger") );

models.setup( app );
app.set( "models", models );

controllers.setup( app );
app.set( "controllers", controllers );

app.engine( "handlebars", handlebars( {
	defaultLayout: "main",
	layoutsDir: "app/views/layouts",
	partialsDir: "app/views/partials"
}) );
app.set( "views", "app/views" );
app.set( "view engine", "handlebars" );

routes.setup( app );

app.locals.appinfo = {
    environment: {
		development: process.env.NODE_ENV === "development",
		production: process.env.NODE_ENV === "production",
		test: process.env.NODE_ENV === "test"
	}
};

var server = app.listen( 3000, function() {
    console.log( process.env.NODE_ENV );
	console.log( "Listening on port %d", server.address().port );
} );
