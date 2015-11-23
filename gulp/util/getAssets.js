/*

	Get all CSS & JS asset sources from assets.json

 */

'use strict';

var fs     = require( 'fs' );
var path   = require( 'path' );

var $      = require( 'gulp-load-plugins' )();
var _      = require( 'lodash' );

var config = require( '../config' );


var getAssets = module.exports = function(  ) {

	var assets, replaceTemplateVars, templateVars;

	if ( !fs.existsSync( config.files.assets ) ) {
		throw new $.util.PluginError( 'get-assets', 'No assets data file exists at ' + config.files.assets );
	}

	assets = {
		data : require( path.resolve( config.files.assets ) ),
		css  : [],
		js   : {
			header : [],
			footer : []
		}
	};

	// Templating variables, for replacing paths etc
	templateVars = {
		'{{ wp.inc }}': config.paths.wp.inc
	};

	replaceTemplateVars = function( string ) {
		_.each( templateVars, function( tVar, tName ) {
			string = string.replace( tName, tVar );
		});

		return string;
	};

	// Parse CSS assets list
	_.each( assets.data.css, function( asset ) {
		if ( asset.external ) {
			return;
		}

		asset.src = replaceTemplateVars( asset.src );

		return assets.css.push( asset.src );
	});

	assets.css.push( 'build/style.css' );

	// Parse JS assets list
	_.each( assets.data.js, function( asset ) {
		if ( asset.external ) {
			return;
		}

		asset.src = replaceTemplateVars( asset.src );

		if ( typeof asset.in_footer !== 'undefined' && !asset.in_footer ) {
			return assets.js.header.push( asset.src );

		} else {
			return assets.js.footer.push( asset.src );
		}

	});

	return assets;

};
