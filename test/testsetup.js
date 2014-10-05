"use strict";

process.env.NODE_ENV = "test";
var config = require( "config" );
var knex = require( "knex" )( config.get("db") ); 
var bookshelf = require( "bookshelf" )( knex );
var models = require( "../app/models/models" );
var controllers = require( "../app/controllers/controllers" );

var mockApp = {
    get: function(name) {
        if( name === "bookshelf" ) {
            return bookshelf;
        } else if( name === "models" ) {
            return models;
        }
    }
};

models.setup( mockApp );
controllers.setup( mockApp );

module.exports = {
    app: mockApp,
    models: models,
    controllers: controllers,
    appUrl: "http://localhost:3000"
};
