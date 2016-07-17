//Variables
var image;

$(document).ready(function () {
	image = $("#glyph");
	ChangeGlyph();
	setInterval(ChangeGlyph, changeInterval);
});

function ChangeGlyph()
{
    image.attr('src', getRandomGlyph());
	
	image.fadeIn(fadeInSpeed, function() {
		setTimeout(function() {
			image.fadeOut(fadeOutSpeed);
		}, fadeToBlackAfter);
	});
}

function getRandomGlyph()
{
	return folder + glyphLocations[Math.floor(Math.random() * glyphLocations.length)];
}