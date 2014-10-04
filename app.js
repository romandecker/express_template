var express = require( "express" );
var config = require( "config" );
var knex = require( "knex" )( config.get( "db" ) );

var routes = require( "./app/routes" );
var models = require( "./app/models/models" );

var bookshelf = require( "bookshelf" )( knex );

var app = express();
app.set( "bookshelf", bookshelf );

app.use( config.get("logger") );

models.setup( app );
app.set( "models", models );

routes.setup( app );

var server = app.listen( 3000, function() {
	console.log( "Listening on port %d", server.address().port );
} );
