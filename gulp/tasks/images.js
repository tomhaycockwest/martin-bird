/*

	Image Optimisation
	---------------

	Compress and optimise all images

 */

'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();

var config = require( '../config' );

gulp.task( 'images', function(  ) {

	return gulp.src( config.globs.img, { base: '.' } )
		.pipe( $.imagemin() )
		.pipe( gulp.dest( config.paths.dist ) )
		.pipe( $.if( global.flags.notify, $.notify({ 'message': 'Images optimised' }) ) );

});
