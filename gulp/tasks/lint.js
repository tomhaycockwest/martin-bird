/*

	Lint Task
	---------------

 */

'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();

var config = require( '../config' );
var handleErrors = require( '../util/errorHandler' );


gulp.task( 'lint', function(  ) {

	return gulp.src( config.globs.js )
		.pipe( $.jshint() )
		.pipe( $.jshint.reporter( 'jshint-stylish' ) )
		.on( 'error', handleErrors )
		.pipe( $.if( global.flags.notify, $.notify({ 'message': 'Scripts linted' }) ) );

});
