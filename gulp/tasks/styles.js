/*

	Styles Task
	---------------

	Compile the styles

 */

'use strict';

var path = require( 'path' );

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();

var config = require( '../config' );
var handleErrors = require( '../util/errorHandler' );

gulp.task( 'styles', function(  ) {

	return gulp.src( config.globs.sass )
		.pipe( $.sourcemaps.init() )
		.pipe( $.sass( config.sass ) )
		.on( 'error', function ( err ) {
			err.message = err.message.replace( '\n', '' );
			handleErrors.call( this, err );
		})
		.pipe( $.autoprefixer( config.autoprefixer ) )
		.pipe( $.sourcemaps.write() )
		.pipe( gulp.dest( config.paths.build ) )
		.pipe( $.if( global.flags.notify, $.notify({ 'message': 'Styles compiled & prefixed' }) ) );

} );
