"use strict";
var BPromise = require("bluebird");

module.exports = function( app ) {
    
    var bookshelf = app.get( "bookshelf" );

    var User = bookshelf.Model.extend( {
        tableName: "users",
        hasTimestamps: true,
        initialize: function() {
            this.on( "saving", this.validate );
        },
        validate: function() {

            var self = this;
            var promise = new BPromise( function( resolve, reject ) {

                User.query().where( "email", "=", self.get("email") )
                            .andWhere( "id", "<>", self.get("id") )
                            .then( function( existingUser ) {

                    if( existingUser ) {
                        //TODO different error type
                        reject( { cause: "Duplicate e-Mail" } );
                    } else {
                        resolve();
                    }
                } );
            } );

            return promise;
        }
    } );
    

    return User;
};
