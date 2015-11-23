/*

	HTML Task
	---------------

	Process the HTML

 */

'use strict';


var gulp         = require( 'gulp' );
var $            = require( 'gulp-load-plugins' )();

var config       = require( '../config' );
var handleErrors = require( '../util/errorHandler' );



gulp.task( 'html', function(  ) {

	var assets = $.useref.assets();

	var opts = {
	    conditionals: true,
	    spare: false
	};

	return gulp.src( '{index,header,footer}.{html,php}' )
		.pipe( $.replace( 'ember.debug.js', 'ember.prod.js' ) )
		.pipe( $.replace( 'ember-data.js', 'ember-data.prod.js' ) )
		.pipe( assets )
		.on( 'error', handleErrors )
		.pipe( $.if( '*.js', $.uglify( config.uglify ) ) )
		.pipe( $.if( '*.css', $.minifyCss( config.cssMin ) ) )
		.pipe( $.rev() )
		.pipe( assets.restore() )
		.pipe( $.useref() )
		.pipe( $.revReplace({
			replaceInExtensions: ['.js', '.css', '.html', '.hbs', '.php']
		}))
		.pipe( gulp.dest( config.paths.dist ) );

});
