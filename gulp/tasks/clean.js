/*

	Clean
	---------------

	Clean up directories

 */

'use strict';

var gulp = require( 'gulp' );
var del = require( 'del' );

var config = require( '../config' );

gulp.task( 'clean:build', function( done ) {

	return del( [ config.paths.build + '/**' ], done );

} );

gulp.task( 'clean:dist', function( done ) {

	return del( [ config.paths.dist + '/**' ], done );

} );

gulp.task( 'clean:temp', function( done ) {

	return del( [ config.paths.temp + '/**' ], done );

} );
