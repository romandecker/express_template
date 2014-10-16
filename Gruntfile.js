"use strict";

// prevent jshint flagging the node_env parameter of express
/* jshint camelcase: false */

module.exports = function( grunt ) {

	grunt.loadNpmTasks( "grunt-express-server" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-mocha-test" );
    grunt.loadNpmTasks( "grunt-jsdoc" );
    grunt.loadNpmTasks( "grunt-env" );
    grunt.loadNpmTasks( "grunt-knex-migrate" );

	grunt.initConfig( {
		watch: {
            /* 
             * Takes care of restarting the express server when a file is
             * changed. Note that restarting the server will trigger linting as
             * well.
             */
			express: {
				files: ["app.js",
						"app/*.js",
						"app/models/*.js",
                        "app/controllers/*.js"],
				tasks: ["lint", "express:development"],
				options: { spawn: false }
			},
            public: {
                files: ["app/views/**/*.html",
                        "app/views/**/*.ejs",
                        "app/public/**/*.html",
                        "app/public/**/*.css",
                        "app/public/**/*.js"],
                options: { livereload: true }
            }
		},
		express: {
            /* 
             * Starts server in environment according to sub-task.
             * express:development for development environment,
             * express:test for test environment and
             * express:production for production.
             */
			options: {
                script: "app.js"
            },
			development: { options: { node_env: "development" }	},
            test: { options: { node_env: "test" } },
            production: { options: { node_env: "production" } }
		},
        env: {
            options: {},
            development: { NODE_ENV: "development" },
            test: { NODE_ENV: "test" },
            production: { NODE_ENV: "production" },
        },
        knexmigrate: {
            config: function( cb ) {

                var config = require( "config" );
                var db = config.get( "db" );


                var cfg = {
                    directory: "app/migrations",
                    tableName: "knex_migrations",
                    database: {
                        client: db.client,
                        connection: {
                            user: db.connection.user,
                            password: db.connection.password,
                            database: db.connection.database
                        }
                    }
                };
                
                cb( null, cfg );
            }
        },
        jshint: {
            all: ["app.js",
                  "app/**/*.js",
                  "test/**/*.js"],
            options: {
                ignores: ["node_modules/**/*",
                          "app/public/bower_components/**/*"
                         ],
                jshintrc: true
            }
        },
        mochaTest: {
            test: {
                options: { },
                src: ["test/**/*.test.js"]
            }
        },
        jsdoc: {
            dist: {
                src: ["app.js",
                      "app/**/*.js",
                      "test/**/*.js",
                      "README.md"],
                options: {
                    destination: "doc"
                }
            }
        }
	} );

    //simple alias
    grunt.registerTask( "lint", "jshint" );
    grunt.registerTask( "doc", "jsdoc" );

    var envs = ["development", "test", "production"];
    var knexCommands = ["latest", "rollback", "currentVersion"];

    //register migration tasks
    knexCommands.forEach( function(cmd) {
        envs.forEach( function(env) {
            grunt.registerTask( "migrate:" + env + ":" + cmd,
                                [ "env:" + env, "knexmigrate:" + cmd ] );
        } );
    } );

    //register make migration task (this one doesn't need an environment)
    grunt.registerTask( "migrate:make",
                        "Create migration",
                        function( name ) {
        if( !name ) {
            throw new Error( "No migration name given! Specify like this: " + 
                             "migrate:make:<migration_name>" );
        }

        grunt.task.run( "knexmigrate:make:" + name );
    } );


    //lint once, then start server and watch for changes
	grunt.registerTask( "server", ["lint", "express:development", "watch"] );

    //start the server in test setup and then run the tests
    grunt.registerTask( "test", ["express:test", "mochaTest"] );

};
