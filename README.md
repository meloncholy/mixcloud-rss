**[MixCloud RSS Converter](http://bits.meloncholy.com/mixcloud-rss) live link**

While it [used to](http://feedback.mixcloud.com/forums/3043-general/suggestions/1922671-loss-of-user-mixes-rss), MixCloud doesn't offer RSS feeds anymore. So I decided to write one.

MixCloud has [an API](http://www.mixcloud.com/developers/documentation) that gave me a stream of recent uploads, which I could the use to get an embedded music player for each post via their eEmbed API. 

You can see the [code in action here](http://bits.meloncholy.com/mixcloud-rss) (feel free to use the feeds too), and there's a [sample WordPress page here](http://www.breakzdjs.com/category/music/) that syndicates feeds from a number of MixCloud (and SoundCloud) accounts. 

I really am standing on the shoulders of giants here as this required almost no code on my part (maybe 300 lines) thanks to the [node-oembed](https://github.com/astro/node-oembed) and [node-rss](https://github.com/dylang/node-rss) modules from Stephan Maka and Dylan Greene, and of course Node.js. 


Settings
--------

Please rename `/config/app-sample.json` to `app.json`.

- **mode** - _production_ loads minimized files and includes Analytics, while _development_ doesn't.
- **localPort** - The local port to use.
- **url** - Public URL for the site.
- **title** - Name of the site. Used in the browser title bar and elsewhere.
- **author** - Not really used, actually. Just appears in the meta header.
- **description** - Meta description content.
- **rssDescription** - Short description of the feed. _%user_ will be swapped for the current account's name.
- **cloudcastStreamUrl** - MixCloud API URL for getting profiles.
- **cloudCastOembedUrl** - MixCloud API URL for getting Cloudcasts.
- **jQueryCdnUrl** - Yup. Only used in _production_ mode.
- **gaAccount** - Your Google Analytics UA number.
- **gaDomain** - Your Analytics domain.

Example

```javascript
{
	"mode": "development",
	"localPort": 3000,
	"url": "http://bits.meloncholy.com/mixcloud-rss/",
	"title": "MixCloud to RSS converter",
	"author": "Andrew Weeks",
	"description": "Get an RSS feed for your (or anyone else's) Mixcloud mixes and podcasts.",
	"rssDescription": "Visit %user's profile on MixCloud. Listen to their recent and most popular Cloudcasts. It's free and really easy to use. MixCloud to RSS thingy hacked together by Andrew Weeks. http://meloncholy.com",
	"cloudcastStreamUrl": "http://api.mixcloud.com/%user/cloudcasts/",
	"cloudcastOembedUrl": "http://www.mixcloud.com/oembed/?url=http%3A//www.mixcloud.com%cloudcast&format=json",
	"jQueryCdnUrl": "https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js",
	"gaAccount": "UA-XXXXXXXX-X",
	"gaDomain": "meloncholy.com"
}
```


Dependencies
------------

In case NPM doesn't help you out for some reason, you'll also need

- [Express](https://github.com/visionmedia/express)
- [Jade](https://github.com/visionmedia/jade)
- [Konphyg](https://github.com/pgte/konphyg)
- [node-oembed](https://github.com/astro/node-oembed/)
- [node-rss](https://github.com/dylang/node-rss)


Legal fun
---------

Copyright &copy; 2012 Andrew Weeks http://meloncholy.com

MixCloud RSS Converter is licensed under the [MIT licence](http://meloncholy.com/licence/).
