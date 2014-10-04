module.exports.setup = function( app ) {

	var bookshelf = app.get( "bookshelf" );
	var models = app.get( "models" );
	var User = models.User;
	
	app.get( "/", function( req, res ) {
	
		var u = new User( { email: "roman.decker@gmail.com" } );
		console.log( "isnew:", u.isNew() );

		u.timestamp();
		u.save();

		console.dir( u );

		User.fetchAll().then( function( users ) {
			res.json( {
				users: users
			} );
		} );
	} );

};
