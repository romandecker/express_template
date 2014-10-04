module.exports = function( app ) {
    
    var bookshelf = app.get( "bookshelf" );

    var User = bookshelf.Model.extend( {
        tableName: "users"
    } );

    return User;
}
