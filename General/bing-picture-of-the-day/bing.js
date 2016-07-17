var imageOfTheDayURL = "http://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=en-US";

$(document).ready(function() {
	getPictureOfTheDay();
});

function getPictureOfTheDay() {
	var result;

	$.getJSON(imageOfTheDayURL, function( data ) {
		debugger;
	});
}