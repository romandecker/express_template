'use strict';

exports.up = function(knex, Promise) {
  return knex.schema.createTable( "users", function( table ) {
		table.increments();
		table.timestamps();
		table.string( "email" );
	} );
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable( "users" );
};
