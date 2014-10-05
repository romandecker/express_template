"use strict";

require( "should" );
require( "assert" );
require( "expect.js" );
var request = require( "supertest" );

var testsetup = require( "./testsetup" );
var User = testsetup.models.User;

describe( "UserController", function() {

    before( function( done ) {
        done();
    } );

    beforeEach( function( done ) {
        //delete all users in the database
        User.query().del().then( done.bind( null, null ) );
    } );

    it( "should list all users", function(done) {
        var u = new User( { email: "john.doe@example.org" } );
        u.save();

        request( testsetup.appUrl )
            .get( "/users" )
            .end( function( err, res ) {
                if( err ) { throw err; }

                res.status.should.equal( 200 );
                done();
            } );

        
    } );
} );
