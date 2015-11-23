/*

	Scripts Task
	---------------

	Compile the scripts

 */

'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );

gulp.task( 'scripts', function ( done ) {
	return runSequence( [ 'lint', 'browserify' ], done );
});
