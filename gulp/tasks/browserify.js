/*

	Browserify Task
	---------------

	Bundle javascripty things with browserify!
	If the watch task is running, this uses watchify instead
	of browserify for faster bundling using caching.

 */

'use strict';


var fs           = require( 'fs' );
var path         = require( 'path' );

var gulp         = require( 'gulp' );
var $            = require( 'gulp-load-plugins' )();
var browserify   = require( 'browserify' );
var watchify     = require( 'watchify' );
var source       = require( 'vinyl-source-stream' );

var config       = require( '../config' );
var handleErrors = require( '../util/errorHandler' );
var bundleLogger = require( '../util/bundleLogger' );


gulp.task( 'browserify', function( done ) {

	var bundleQueue = config.browserify.bundleConfigs.length;

	var browserifyThis = function( bundleConfig ) {

		if ( !fs.existsSync( path.resolve( bundleConfig.entries ) ) ) {
			return done( new $.util.PluginError( 'browserify', 'No script entry point exists, skipping Browserify. Path specified was: ' + bundleConfig.entries ) );
		}

		var bundler = browserify({
			// Required watchify args
			cache : {}, packageCache : {}, fullPaths : global.flags.watch,

			// Specify the entry point of your app
			entries    : bundleConfig.entries,

			// Add file extensions to make optional in your requires
			extensions : config.browserify.extensions,

			// Enable source maps!
			debug      : config.browserify.debug
		});

		var bundle = function(  ) {
			// Log when bundling starts
			bundleLogger.start( bundleConfig.outputName );

			return bundler
				.bundle(  )

				// Report compile errors
				.on( 'error', handleErrors )

				// Use vinyl-source-stream to make the
				// stream gulp compatible. Specify the
				// desired output filename here.
				.pipe( source( bundleConfig.outputName ) )

				// Specify the output destination
				.pipe( gulp.dest( bundleConfig.dest ) )

				.on( 'end', reportFinished );
		};

		if ( global.flags.watch ) {
			// Wrap with watchify and rebundle on changes
			bundler = watchify( bundler );

			// Rebundle on update
			bundler.on( 'update', bundle );
		}

		var reportFinished = function() {
			// Log when bundling completes
			bundleLogger.end( bundleConfig.outputName );

			if ( bundleQueue ) {
				bundleQueue--;

				if ( bundleQueue === 0 ) {
					// If queue is empty, tell gulp the task is complete.
					// https://github.com/gulpjs/gulp/blob/master/docs/API.md#accept-a-callback
					done(  );
				}
			}
		};

		return bundle(  );
	};

	// Start bundling with Browserify for each bundleConfig specified
	config.browserify.bundleConfigs.forEach( browserifyThis );

});
