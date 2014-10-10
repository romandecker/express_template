"use strict";

module.exports.setup = function( app ) {

    var models = app.get( "models" );
    var User = models.User;

    return {
        index: function( req, res ) {

            User.fetchAll().then( function( users ) {
                res.render( "users/index", {
                    layouts: 'layouts/base'
                } );
            } ).catch( function(error) {
                res.status( 500 ).json( error );
            } );
        },
        deleteAll: function( req, res ) {
            User.query().del().then( function() {
                res.json( "Users deleted!" );
            } ).catch( function( error ) {
                res.status( 500 ).json( error );
            } );
        }
    };
};

