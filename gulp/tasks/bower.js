// Bower

'use strict';


var fs           = require( 'fs' );

var gulp         = require( 'gulp' );

var config       = require( '../config' );
var handleErrors = require( '../util/errorHandler' );


gulp.task('bower:postinstall', function( done ) {

	var _this = this;

	// https://github.com/sass/sass/issues/556#issuecomment-73439666
	fs.rename(
		config.paths.bower + '/normalize.css/normalize.css',
		config.paths.bower + '/normalize.css/_normalize.scss',
		function ( err ) {
			if ( err ) {
				handleErrors.call( _this, err );
			}

			done();
		}
	);

});
