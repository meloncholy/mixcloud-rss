/*!
* MixCloud RSS Converter
*
* @package    MixCloudRSS
* @subpackage routes.feed
* @copyright  Copyright (c) 2012, 2013 Andrew Weeks http://meloncholy.com
* @license    MIT licence. See http://meloncholy.com/licence for details.
* @version    0.2.0
*/

"use strict";

var RSS = require("rss");
var oembed = require("oembed");
var sanitize = require("validator").sanitize;

var feed = function () {
	var exports = {};
	var config = global.app.config;


	// Build RSS feed. Start by requesting user stream.

	exports.index = function (req, res) {
		var user = sanitize(req.params.user).xss();
		var stuff = { req: req, res: res, user: user };
		var streamUrl = settings.cloudcastStreamUrl.replace("%user", user);

		oembed.fetchJSON(streamUrl, function (error, result) { fetchCloudcasts(stuff, error, result); });
	};


	// Get oEmbed for each post in stream.

	function fetchCloudcasts(stuff, error, result) {
		if (error) {
			console.error("fetchCloudcasts:", error);

			if (error.message === "HTTP status 404") {
				stuff.res.render("error", { status: 404, message: "Sorry, that account doesn&rsquo;t seem to exist. Could you check you&rsquo;ve got it right?", settings: settings });
			} else {
				stuff.res.render("error", { status: 500, message: error.message, settings: settings });
			}
			return;
		}

		var cloudcasts = result.data;
		var cloudcastUrl = settings.cloudcastOembedUrl;
		// Skip "\'s Cloudcasts"
		var author = sanitize(result.name).xss().slice(0, -13);

		stuff.length = cloudcasts.length;
		stuff.count = 0;

		// Initialise RSS object
		stuff.feed = new RSS({
			title: result.name,
			description: settings.rssDescription.replace("%user", author),
			feed_url: settings.url + stuff.req.url.substring(1),
			site_url: settings.url,
			// image_url: 'http://example.com/icon.png',
			author: author
		});

		if (cloudcasts.length === 0) {
			renderFeed(stuff);
		} else {
			// Each post has to be requested separately.
			for (var i = 0, len = cloudcasts.length; i < len; i++) {
				(function (cloudcast) {
					oembed.fetchJSON(cloudcastUrl.replace("%cloudcast", cloudcast.key), function (error, result) { renderFeed(stuff, { url: cloudcast.url, date: new Date(cloudcast.created_time) }, error, result); });
				})(cloudcasts[i]);
			}
		}
	}


	// Build and render RSS feed for stream.

	function renderFeed(stuff, info, error, result) {
		var locals = {};

		if (error) {
			console.error("renderFeed:", error);
			stuff.res.render("error", { status: 500, message: error.message, settings: settings });
			return;
		}

		if (stuff.length > 0) {
			// Add post to feed.
			stuff.feed.item({
				title: sanitize(result.title).xss(),
				description: result.html,
				url: info.url,
				author: result.author_name,
				date: info.date
			});
			// Got all Cloudcasts yet?
			if (++stuff.count < stuff.length) return;

			// Sort (as requests may return out of order) and render.
			stuff.feed.items.sort(function (a, b) { return b.date - a.date; });
		}

		stuff.res.render("feed", { xml: stuff.feed.xml("\t"), layout: false });
	}


	// A subset of exports.index that sticks the latest Cloudcast in some JSON.

	exports.test = function (req, res, next) {
		var user = sanitize(req.params.user).xss();
		var stuff = { req: req, res: res, user: user };
		var streamUrl = settings.cloudcastStreamUrl.replace("%user", user);

		oembed.fetchJSON(streamUrl, function (error, result) { fetchCloudcastTest(stuff, error, result); });
	};


	function fetchCloudcastTest(stuff, error, result) {
		if (error) {
			console.error("fetchCloudcastTest:", error);

			if (error.message === "HTTP status 404") {
				stuff.res.json({ error: "Sorry, that account doesn&rsquo;t seem to exist. Could you check you&rsquo;ve got it right?" }, 404);
			} else {
				stuff.res.json({ error: error.message }, 500);
			}
			return;
		}

		var cloudcasts = result.data;
		var cloudcastUrl = settings.cloudcastOembedUrl;
		// Skip "\'s Cloudcasts"
		var author = sanitize(result.name).xss().slice(0, -13);

		if (cloudcasts.length === 0) {
			stuff.res.json({ author: author, title: "Nothing to see here", html: "<p>Hmmm&hellip; Looks like " + author + " hasn&rsquo;t put up any Cloudcasts yet. You can still subscribe and get them when they appear.</p>" });
		} else {
			oembed.fetchJSON(cloudcastUrl.replace("%cloudcast", cloudcasts[0].key), function (error, result) { renderTest(stuff, { author: author }, error, result); });
		}
	}


	function renderTest(stuff, info, error, result) {
		if (error) {
			console.error("renderTest:", error);
			stuff.res.json({ error: error.message }, 500);
			return;
		}

		stuff.res.json({ author: info.author, title: sanitize(result.title).xss(), html: result.html });
	}

	return exports;
};

module.exports = feed();
