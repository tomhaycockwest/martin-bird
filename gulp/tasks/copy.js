// Copy

'use strict';

var gulp = require( 'gulp' );
var config = require( '../config' );

gulp.task( 'copy', function(  ) {

	var src = [
		// './.env',
		'**/*.{html,php}',
		'assets/data/**/*.*',
		'assets/fonts/**/*.*',
		'./favicon.ico',
		'!./{index,header,footer}.{html,php}', // `html` task will do these
		'!node_modules/**/*.*',
		'!dist/**/*.*',
		'!gulp/**/*.*',
		'!test/**/*.*',
		'!**/tests/**/*.*',
		'!assets/vendor/**/*.*',
	];

	return gulp.src( src, { base: '.' } )
		.pipe( gulp.dest( config.paths.dist ) );

} );