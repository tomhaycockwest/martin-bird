// Cucumber Tests

'use strict';

var gulp         = require( 'gulp' );
var $            = require( 'gulp-load-plugins' )();

var cucumber;


function pluginExists(  ) {

	try {
		cucumber = require( 'gulp-cucumber' );

	} catch ( e ) {
		$.util.log( 'No plugin ' + $.util.colors.magenta( 'gulp-cucumber' ) + ' found. Check the devDependencies are installed.' );
		return false;
	}

	return true;

}


gulp.task('cucumber', function(  ) {

	if ( !pluginExists() ) { return; }

	return gulp.src( 'test/features/*.feature', { read: false } )
		.pipe( cucumber() );

});


gulp.task('cucumber:watch', ['cucumber'], function(  ) {

	if ( !pluginExists() ) { return; }

	return gulp.watch( 'test/**/*.*', ['cucumber'] );

});
