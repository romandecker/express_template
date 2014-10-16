'use strict';

exports.up = function(knex, Promise) {
    return knex.schema.table( "users", function( table ) {
        table.unique( "email" );
    } );
};

exports.down = function(knex, Promise) {
    return knex.schema.table( "users", function( table ) {
        table.dropUnique( "email" );
    } );
};
