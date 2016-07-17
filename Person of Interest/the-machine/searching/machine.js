var width = window.innerWidth;
var height = window.innerHeight;

$(document).ready(function () {
	changeFeed();
	feedLoop();
	setCamNumber();
	startTime();
});

function changeFeed() {
	$('.feed').css('background-image', 'url(' + getRandomFeed() + ')');
	setCamNumber();
}

function getRandomLatAndLong() {
	var lat = getRandomArbitrary(40.8511221, 40.8568691);
	var longitude = getRandomArbitrary(-73.9107783, -74.0148298);
	
	return { Latitude: lat.toFixed(6), Longitude: longitude.toFixed(6) };
}

function getRandomFeed() {
	var latLong = getRandomLatAndLong();
	return "https://maps.googleapis.com/maps/api/streetview?size=640x382&location=" + latLong.Latitude + "," + latLong.Longitude + "&fov=120";
}

function feedLoop() {
	setTimeout(function() {
		changeFeed();
		feedLoop();
	}, getRandomArbitrary(500, 3500));
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function setCamNumber() {
	$('.cam-number').html('CAM ' + getRandomIntInclusive(1, 400).toString());
}
function startTime() {
	setTime();
	
	setInterval(function () {
		setTime();
	}, 1000);
}
function setTime() {
	var date = new Date();
	$('.time').html(date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds());
}