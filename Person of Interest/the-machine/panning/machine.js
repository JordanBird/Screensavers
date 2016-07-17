var width = window.innerWidth;
var height = window.innerHeight;

var widthRange = width * 2;
var heightRange = height * 2;

var feeds = [];
var mpovs = [];

$(document).ready(function () {
	var date = new Date();
	var seedString = date.getYear() + date.getMonth() + date.getDay() + date.getHours();
	Math.setSeed(parseInt(seedString));
	
	placeFeeds();
	shuffleFeedIndexes();
	createMPOVs();
	panFeedLoop();
	mpovMove();
});

function createFeeds() {
	for (var i = 0; i < 60; i++) {
		var feed = createFeed();
		feeds.push(feed);
	}
}
function createMPOVs() {
	for (var i = 0; i < 60; i++) {
		var mpov = createMPOVBOX();
		mpovs.push(mpov);
	}
}
function placeFeeds() {
	var smallestPossibleWidth = 640 / 2;
	var smallestPossibleHeight = 360 / 2;
	
	for (var x = -widthRange; x < widthRange; x += smallestPossibleWidth) {
		for (y = -heightRange; y < heightRange; y+= smallestPossibleHeight) {
			var feed = createFeed(y + getRandomArbitrary(-50, 50), x + getRandomArbitrary(-50, 50));
			feeds.push(feed);
		}
	}
}

function panFeedLoop() {
	setTimeout(function() {
		var direction = getRandomIntInclusive(0, 1);
		
		if (direction == 0)
		{
			var distance = getRandomArbitrary(0, heightRange);
			$('.feeds-container').animate({top: distance});
		}
		else
		{
			var distance = getRandomArbitrary(0, widthRange);
			$('.feeds-container').animate({left: distance});
		}
		
		panFeedLoop();
	}, getRandomArbitrary(0, 5000));
}

function shuffleFeedIndexes() {
	for (var i = 0; i < feeds.length; i++) {
		$(feeds[i]).css('z-index', getRandomIntInclusive(0, feeds.length));
	}
}

function mpovMove() {
	setTimeout(function() {
		var mpov = mpovs[getRandomIntInclusive(0, mpovs.length - 1)];
		
		var left = getRandomArbitrary(-150, 150);
		var top = getRandomArbitrary(-150, 150);
		
		$(mpov).animate({top: parseInt($(mpov).css('top')) + top, left: parseInt($(mpov).css('left')) + left});
		mpovMove();
	}, getRandomArbitrary(0, 100));
}

function feedLoop() {
	setTimeout(function() {
		createFeed();
	}, getRandomArbitrary(0, 5000));
}

function createFeed() {
	var top = getRandomArbitrary(-heightRange, heightRange);
	var left = getRandomArbitrary(-widthRange, widthRange);
	
	var dimensions = getRandomFeedDimensions();
	var newFeedContainer = $('<div class="feed-container"></div>');
	var newFeed = $('<div class="feed"></div>');
	$(newFeedContainer).css({top: top, left: left});
	$(newFeed).css('background-image', 'url(' + getRandomFeed() + ')');
	$(newFeedContainer).css({width: dimensions.Width, height: dimensions.Height});
	
	$(newFeedContainer).append(newFeed);
	$('.feeds-container').append(newFeedContainer);
	
	return newFeedContainer;
}
function createFeed(top, left) {
	if (top == null) {
		top = getRandomArbitrary(-heightRange, heightRange);
	}
	if (width == null) {
		left = getRandomArbitrary(-widthRange, widthRange);
	}
	
	var dimensions = getRandomFeedDimensions();
	var newFeedContainer = $('<div class="feed-container"></div>');
	var newFeed = $('<div class="feed"></div>');
	$(newFeedContainer).css({top: top, left: left});
	$(newFeed).css('background-image', 'url(' + getRandomFeed() + ')');
	$(newFeedContainer).css({width: dimensions.Width, height: dimensions.Height});
	
	$(newFeedContainer).append(newFeed);
	$('.feeds-container').append(newFeedContainer);
	
	return newFeedContainer;
}

function createMPOVBOX() {
	var top = getRandomArbitrary(-heightRange, heightRange);
	var left = getRandomArbitrary(-widthRange, widthRange);
	
	var dimensions = getRandomMPOVDimensions();
	var newMPOV = $('<div class="mpovbox"></div>');
	$(newMPOV).css({top: top, left: left});
	$(newMPOV).css({width: dimensions.Width, height: dimensions.Height});
	
	$('.feeds-container').append(newMPOV);
	
	return newMPOV;
}

function deleteFeed(feed) {
	$(feed).remove();
}

function getRandomArbitrary(min, max) {
  return Math.seededRandom() * (max - min) + min;
}
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.seededRandom() * (max - min + 1)) + min;
}
function getRandomLatAndLong() {
	var lat = getRandomArbitrary(40.8511221, 40.8568691);
	var longitude = getRandomArbitrary(-73.9107783, -74.0148298);
	
	return { Latitude: lat.toFixed(6), Longitude: longitude.toFixed(6) };
}

function getRandomFeed() {
	var latLong = getRandomLatAndLong();
	//https://maps.googleapis.com/maps/api/streetview?size=640x382&location=40.758895,-73.985131&fov=120
	return "https://maps.googleapis.com/maps/api/streetview?size=640x382&location=" + latLong.Latitude + "," + latLong.Longitude + "&fov=120";
}

function getRandomFeedDimensions()
{
	var divisor = getRandomArbitrary(1, 2);
	
	var dHeight = 360 / divisor;
	var dWidth = 640 / divisor;
	
	return { Height: dHeight, Width: dWidth };
}

function getRandomMPOVDimensions()
{
	var value = getRandomArbitrary(40, 75);
	
	var dHeight = value;
	var dWidth = value;
	
	return { Height: dHeight, Width: dWidth };
}

//Seeded Random Stuff
//Thanks! http://indiegamr.com/generate-repeatable-random-numbers-in-js/
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
	
	if (Math.seed === undefined) {
		Math.seed = Math.random();
	}
	else {
		Math.seed = (Math.seed * 9301 + 49297) % 233280;
	}
    
	var rnd = Math.seed / 233280.0;
	
    return min + rnd * (max - min);
}
Math.setSeed = function(seed) {
	Math.seed = seed;
}