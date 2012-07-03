/*!
* MixCloud RSS Converter
*
* @package    MixCloudRSS
* @subpackage public.javascripts.custom
* @copyright  Copyright (c) 2012 Andrew Weeks http://meloncholy.com
* @license    MIT licence. See http://meloncholy.com/licence for details.
* @version    0.1.0
*/

$(function () {
	"use strict";

	var $progressBar = $("#progress-bar");
	var progressTracker;
	var percent = 1;
	var step = 1;
	var siteUrl = "http://bits.meloncholy.com/mixcloud-rss/";
	var successHtml = $("#alert-success").html();

	$(".alert").hide();

	$("#mixcloud-profile").tooltip().keydown(function (e) {
		if (e.which === 13) $("#submit").trigger("click");
	});

	$("#submit").click(function () {
		var user = $("#mixcloud-profile").val().replace(/.*mixcloud\.com\/([^\/]+)\/?.*/i, "$1");

		if (user === "") {
			return;
		} else if (user.indexOf("/") !== -1) {
			$(".alert, #results").fadeOut(250);
			$("#alert-bad-user").show();
			$("#response").fadeIn(250);
			return;
		}

		$("#response").fadeIn(250);
		$progressBar.removeClass("done").addClass("right");
		$(".alert, #results").fadeOut(250);

		progress();

		$.getJSON(siteUrl + user + "/test/", function (data) {
			$("#alert-success").html(successHtml + data.author + ".").fadeIn(250);
			$("#test").html("<h2>" + data.title + "</h2>" + data.html);
			$("#mixcloud-url").val(siteUrl + user);
			$("#results").fadeIn(250);
			clearTimeout(progressTracker);
			$progressBar.addClass("done").css("width", 0);
		}).error(function () {
			$("#alert-error").fadeIn(250);
			clearTimeout(progressTracker);
			$progressBar.addClass("done").css("width", 0);
		});

		return false;
	});

	function progress()
	{
		$progressBar.toggleClass("right");

		progressTracker = setInterval(function () {
			if (percent === 101 || percent === -1) {
				step = step * -1;
				clearTimeout(progressTracker);
				setTimeout(progress, 250);
			}

			$progressBar.css("width", (percent += step) + "%");
		}, 50);
	}
});