"use strict";

require( "sugar" );

module.exports.setup = function( app ) {
};

module.exports.index = function( Model, req, res ) {
    
    Model.fetchAll().then( function( results ) {
        res.json( results );
    } ).catch( function(error) {
        res.status( 500 ).json( error );
    } );
};

module.exports.get = function( Model, req, res ) {
    
    var id = req.params.id;

    Model.where( {id: id} ).fetch().then( function( result ) {
        if( !result ) {
            res.status( 404 ).send();
        } else {
            res.json( result );
        }
    } ).catch( function(error) {
        res.status( 500 ).json( error );
    } );
};

module.exports.create = function( Model, req, res ) {
    
    var data = Object.merge( req.body, req.query );
    var model = new Model( data );

    model.save().then( function( savedModel ) {
        res.status( 201 ).json( savedModel );
    } ).catch( function(error) {
        res.status( 500 ).json( error );
    } );
};

module.exports.update = function( Model, req, res ) {
    
    var id = req.params.id;
    var data = Object.merge( req.body, req.query );
    
    Model.where( { id: id } ).fetch().then( function( result ) {
        if( !result ) {
            res.status( 404 ).send();
        } else {
            result.save( data, { patch: true } ).then( function(savedModel) {
                res.status( 200 ).json( savedModel );
            } );
        }
    } );
};

module.exports.destroy = function( Model, req, res ) {
    
    var id = req.params.id;

    Model.where( { id: id } ).fetch().then( function( result ) {
        if( !result ) {
            res.status( 404 ).send();
        } else {
            result.destroy().then( function() {
                res.status( 200 ).send();
            } );
        }
    } ).catch( function(error) {
        res.status( 500 ).json( error );
    } );
    
};
