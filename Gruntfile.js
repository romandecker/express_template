module.exports = function( grunt ) {

	grunt.loadNpmTasks( 'grunt-express-server' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );

	grunt.initConfig( {
		watch: {
			express: {
				files: ["app.js",
						"app/*.js",
						"app/models/*.js"],
				tasks: ["express:dev"],
				options: { spawn: false }
			}
		},
		express: {
			options: { script: "app.js" },
			dev: {
				options: {
					node_env: "development"
				}
			}
		}
	} );

	grunt.registerTask( "server", ["express:dev", "watch"] );

};
