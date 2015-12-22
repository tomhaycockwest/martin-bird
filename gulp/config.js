/*

	Config
	---------------

	Gulp options
 */

var path = require( 'path' );
var args = require( 'yargs' ).argv;
var _ = require('lodash');

/**
 * Command Line Flags
 *
 * `gulp --dist`    // -> Compile the dist version
 * `gulp --gu`  // -> displays Growl/OSX notifications when tasks run
 */
global.flags = {
	dist   : args.dist || false,
	watch  : args.watch || false,
	notify : args.notify || false
};


	var root  = '.';
	var assets = './assets';



var paths = {
	root      : '' + root,
	assets     : '' + assets,
	dist      : '' + root + '/dist',
	temp      : '' + assets + '/temp',
	build     : '' + assets + '/build',
	sass      : '' + assets + '/sass',
	img       : '' + assets + '/img',
	scripts   : '' + assets + '/scripts',
	icons : '' + assets + '/icons',
	fonts     : '' + assets + '/fonts',
	data      : '' + assets + '/data',
	bower     : '' + assets + '/vendor',
	delivery : '' + root + '/delivery'
};

paths.bundle = paths.build;
paths.css    = paths.build;


var files = {
	assets : '' + assets + '/assets.json'
};


var globs = {
	ignore    : '!./{node_modules,.sass-cache,vendor,dist}/**/*.*',
	build     : '' + paths.build + '/**/*.*',
	css       : '' + paths.css + '/**/*.css',
	sass      : '' + paths.sass + '/**/*.{scss,sass}',
	img       : '' + paths.img + '/**/*.{gif,jpg,jpeg,png,svg}',
	js        : '' + paths.scripts + '/**/*.js', // Used for linting
	scripts   : '' + paths.scripts + '/**/*.{js,coffee}',
	templates : '' + assets + '/templates/**/*.hbs',
	dist     : '' + paths.dist + '/**/*.*',


	html      : '' + root + '/*.html',
	php       : '' + root + '/**/*.php',



	features  : '' + root + '/features/**/*.feature',
	icons : '' + paths.icons + '/**/*.svg'

};

/**
 * Join all glob paths so gulp.watch can see new files
 *
 * @link http://stackoverflow.com/a/26851844/403311
 */
_.each(globs, function( glob, key ) {
	globs[ key ] = path.join( glob )
});

	globs.livereload = [
		globs.build,
		globs.css,
		globs.img,
		globs.html,
		globs.php,
		globs.templates,
		globs.ignore
	];


module.exports = {
	pkg : require( path.resolve( './package.json' ) ),

	autoprefixer : ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'Explorer >= 7'],
	cssMin       : {
		advanced      : false,
		compatibility : 'ie7'
	},
	uglify       : {
		outSourceMap     : false,
		compress         : false,
		preserveComments : false
	},
	browserify   : {
		// Enable source maps
		debug         : !flags.dist,

		// Additional file extensions to make optional
		extensions    : ['.js', '.coffee', '.hbs'],

		// A separate bundle will be generated for each
		// bundle config in the array below
		bundleConfigs : [{
			entries    : paths.scripts + '/index.js',
			dest       : paths.bundle,
			outputName : 'bundle.js'
		}]
	},

	files : files,
	paths : paths,
	globs : globs,
	flags : flags
};
