// Default task

'use strict';


var gulp         = require( 'gulp' );
var runSequence = require( 'run-sequence' );


gulp.task( 'default', function( done ) {

	global.flags.watch = true;

	return runSequence( [ 'build:dev', 'watch' ], done );

});
