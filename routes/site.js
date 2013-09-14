/*!
* MixCloud RSS Converter
*
* @package    MixCloudRSS
* @subpackage routes.site
* @copyright  Copyright (c) 2012, 2013 Andrew Weeks http://meloncholy.com
* @license    MIT licence. See http://meloncholy.com/licence for details.
* @version    0.2.0
*/

'use strict';

var Exports = function () {};

Exports.prototype.index = function ( req, res ) {
	var locals = { home: true };

	res.render(
		'index-template', {
			locals: locals,
			config: global.app.config
		}
	);
};

module.exports = new Exports();
