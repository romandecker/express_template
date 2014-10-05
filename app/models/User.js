"use strict";

module.exports = function( app ) {
    
    var bookshelf = app.get( "bookshelf" );

    var User = bookshelf.Model.extend( {
        tableName: "users",
        hasTimestamps: true
    } );

    return User;
};
