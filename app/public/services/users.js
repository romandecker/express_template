"use strict";

var app = angular.module( "express_template" );

app.factory( "User", ["$resource", function( $resource ) {
    return $resource( "users/:id", {}, {
        get: { method: "GET" }
    } );
}] );
