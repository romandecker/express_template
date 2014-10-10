/**
 * @file Main entry point for the application. Registers routes, models,
 * controllers and views.
 */

"use strict";

var express = require( "express" );
var config = require( "config" );
var knex = require( "knex" )( config.get( "db" ) );

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

app.set( "views", "app/views" );
app.set( "view engine", "ejs" );

routes.setup( app );

app.locals.appinfo = {
    environment: process.env.NODE_ENV
};

var server = app.listen( 3000, function() {
    console.log( process.env.NODE_ENV );
	console.log( "Listening on port %d", server.address().port );
} );
