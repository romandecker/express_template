"use strict";

var app = angular.module( "express_template" );

app.controller( "UserListCtrl",
                function( $scope,
                          User ) {

    $scope.users = User.query();
} );
app.controller( "UserEditCtrl",
                function( $scope,
                          User ) {

    $scope.user = User.get( { id: 123 } );
} );
