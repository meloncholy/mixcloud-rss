/*!
* MixCloud RSS Converter
*
* @package    MixCloudRSS
* @subpackage routes.site
* @copyright  Copyright (c) 2012 Andrew Weeks http://meloncholy.com
* @license    MIT licence. See http://meloncholy.com/licence for details.
* @version    0.1.0
*/

"use strict";

var site = function () {
	var exports = {};
	var settings = global.mcSettings.app;

	exports.index = function (req, res) {
		var locals = { home: true };

		res.render("index", { locals: locals, settings: settings });
	};

	return exports;
};

module.exports = site();
