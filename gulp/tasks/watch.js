/*

	Watch Task
	---------------

	Watch & livereload
	NB: the browserify task handles JS recompilation

 */

'use strict';

var gulp = require( 'gulp' );
var $ = require( 'gulp-load-plugins' )();
var _ = require( 'lodash' );

var config = require( '../config' );
var handleErrors = require( '../util/errorHandler' );

gulp.task( 'watch', function(  ) {

	var server, watchers;

	server = $.livereload;
	server.listen(  );

	watchers = {  };

	watchers.livereload = gulp.watch( config.globs.livereload ).on( 'change', server.changed );
	watchers.sass       = gulp.watch( config.globs.sass, ['styles'] );
	watchers.js         = gulp.watch( config.globs.js, ['lint'] );
	watchers.icons  = gulp.watch( config.globs.icons, ['iconfont', 'styles:dev'] );


	_.each( watchers, function( watcher ) {
		watcher.on( 'error', function( error ) {
			console.log( '\n[Gulp Watch] Error: ' + error );
		} );
	} );

} );