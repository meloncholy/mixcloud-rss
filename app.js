/*!
* Mixcloud RSS Converter
*
* @package    MixcloudRSS
* @subpackage app
* @copyright  Copyright (c) 2012, 2013 Andrew Weeks http://meloncholy.com
* @license    MIT licence. See http://meloncholy.com/licence for details.
* @version    0.2.0
*/

'use strict';

var express = require( 'express' ),
	cons = require( 'consolidate' ),
	dust = require( 'dustjs-linkedin' ),
	dustHelpers = require( 'dustjs-helpers' );

// var fs = require('fs');
var routes = require( './routes' );
var config = require( './config' );

global.app = {
	path: __dirname,
	config: config
};


if ( global.app.config.url.slice( -1 ) !== '/' ) global.app.config.url += '/';

//routes.site = require( './routes/site' );
//routes.feed = require( './routes/feed' );

var app = express();
// var app = module.exports = express.createServer();
// var logFile = fs.createWriteStream(__dirname + '/mixcloud-rss.log', { flags: 'a' });

// app.use( express.logger( { stream: logFile } ) );

app.set( 'env', config.mode )
.set( 'views', __dirname + '/views' )
.set( 'view engine', 'dust' )
.engine( 'dust', cons.dust )
.use( express.bodyParser() )
.use( express.methodOverride() )
.use( express.static( __dirname + '/public' ) )
.use( app.router );

app.configure( 'development', function () {
	app.use( express.errorHandler( { dumpExceptions: true, showStack: true } ) );
} );

app.configure( 'production', function () {
	app.use( express.errorHandler() );
} );


// Routes
// Make sure you have a favicon or this will request user favicon.ico from Mixcloud
//app.get( '/:user/test', routes.feed.test );
//app.get( '/:user', routes.feed.index );
app.get( '/', routes.site.index );

app.listen( config.port );
console.log( 'Running on port %d in %s mode. Shiny! :)', config.port, app.settings.env );
