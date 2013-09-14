/**
 *
 */

module.exports = {
	mode: 'production',
	port: 3000,
	url: 'http://katie:3000/',
	title: 'Mixcloud to RSS converter',
	author: 'Andrew Weeks',
	description: 'Get an RSS feed for your (or anyone else\'s) Mixcloud mixes and podcasts. Just paste in the Mixcloud account you want and get an RSS URL in return.',
	rssDescription: 'Visit %user\'s profile on Mixcloud and listen to their recent and most popular Cloudcasts. Mixcloud to RSS converter by Andrew Weeks - http://meloncholy.com',
	cloudcastStreamUrl: 'http://api.mixcloud.com/%user/cloudcasts/',
	cloudcastOembedUrl: 'http://www.mixcloud.com/oembed/?url=http%3A//www.mixcloud.com%cloudcast&format=json',
	jQueryCdnUrl: 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js',
	gaAccount: 'UA-17270468-1',
	gaDomain: 'meloncholy.com'
};

// http://api.mixcloud.com/spartacus/party-time/embed-json/?width=400&height=400&color=ff0000
