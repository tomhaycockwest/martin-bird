'use strict';

var _ = require( 'lodash' );
var notify = require( 'gulp-notify' );

module.exports = function(  ) {

	var args = Array.prototype.slice.call( arguments );
	var msg  = args[ 0 ];

	if ( typeof args[ 0 ] !== 'undefined' && typeof args[ 0 ].message !== 'undefined' ) {

		msg = '<%= error.message %>';

	}

	notify.onError( {

		title : 'Compile Error',
		message : msg

	} ).apply( this, args );

	this.emit( 'end' );

};
