/*

	Compress
	---------------

	Compresses dist folder for final delivery and easy upload to DoubleClick Studio

 */

'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var config = require( '../config' );


gulp.task('compress', function() {
    return gulp.src( config.globs.dist )

        .pipe( $.zip( 'archive.zip' ) )
        .pipe( gulp.dest( config.paths.delivery ) );
});
