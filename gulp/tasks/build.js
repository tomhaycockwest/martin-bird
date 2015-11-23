// Alias build tasks

'use strict';

var gulp = require( 'gulp' );
var runSequence = require( 'run-sequence' );

gulp.task( 'build:dev', function( done ) {

	return runSequence( [ 'styles', 'scripts' ], done );

} );

gulp.task( 'build:dist', [ 'build:dev' ], function( done ) {

	global.flags.dist = true;

	return runSequence(
		'clean:dist',
		['html', 'images', 'copy'],
		done
	);

} );
