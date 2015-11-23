/*

	bundleLogger
	----------------------

	Provides gulp style logs to the bundle method in browserify
	@link https://github.com/greypants/gulp-starter/blob/master/gulp/util/bundleLogger.js

 */

'use strict';

var gutil = require( 'gulp-util' );
var prettyHrtime = require( 'pretty-hrtime' );

var startTime;

module.exports = {

	start: function( filepath ) {

		startTime = process.hrtime(  );

		gutil.log( 'Running', gutil.colors.cyan( '\'bundle\'' ), 'on', gutil.colors.green( filepath ) + '...' );

	},

	end: function( filepath ) {

		var taskTime   = process.hrtime( startTime );
		var prettyTime = prettyHrtime( taskTime );

		gutil.log( 'Finished', gutil.colors.cyan( '\'bundle\'' ), 'on', gutil.colors.green( filepath ), 'after', gutil.colors.magenta( prettyTime ) );

	}

};
