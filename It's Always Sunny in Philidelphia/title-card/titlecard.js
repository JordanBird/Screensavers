var fadeTime = 200;

$(document).ready(function () {
	setLocation();
	setShowTitle();
	startTime();
	startTitleTick();
});

function setLocation() {
	if (settings["titleLocation"] != null && settings["titleLocation"] != undefined) {
		$('.location').html(settings["titleLocation"]);
	}
	else {
		$('.location').html("Philidelphia, PA");
	}
}

function setShowTitle() {
	if (settings["titleShow"] != null && settings["titleShow"] != undefined) {
		$('.title').html(settings["titleShow"]);
	}
	else {
		$('.title').html("It's Always Sunny<br>in Philidelphia");
	}
}

function startTime() {
	setTime();
	setDay();
	setInterval(function () {
		setTime();
		setDay();
	}, 1000);
}

function startTitleTick() {
	titleTick();
	setInterval(function () {
		titleTick();
	}, 15000);
}

function titleTick() {
	$('.time').fadeIn(fadeTime);
	
	setTimeout(function () {
		$('.time').fadeOut(fadeTime, function () { $('.day').fadeIn(fadeTime); });
	}, 2000);

	setTimeout(function () {
		$('.day').fadeOut(fadeTime, function () { $('.location').fadeIn(fadeTime); });
	}, 4000);
	
	setTimeout(function () {
		$('.location').fadeOut(fadeTime);
	}, 6000);
	
	setTimeout(function () {
		$('.title').fadeIn(fadeTime);
	}, 8000);
	setTimeout(function () {
		$('.title').fadeOut(fadeTime);
	}, 12000);
}

function setTime() {
	$('.time').html(getAlwaysSunnyTitleTime());
}

function getAlwaysSunnyTitleTime() {
	var hours = new Date().getHours();
	var minutes = new Date().getMinutes();
	
	var period = hours >= 12 ? "PM" : "AM";
	
	if (hours > 12)
	{
		hours -= 12;
	}
	else if (hours == 0)
	{
		hours = 12;
	}
	
	var outHours = hours.toString();
	if (outHours.length == 1)
	{
		outHours = "0" + outHours;
	}
	
	var outMinutes = minutes.toString();
	if (outMinutes.length == 1)
	{
		outMinutes = "0" + outMinutes;
	}
	
	return outHours + ":" + outMinutes + " " + period;
}

function setDay() {
	$('.day').html(getAlwaysSunnyTitleDay());
}

function getAlwaysSunnyTitleDay() {
	var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
	var day = days[ new Date().getDay() ];
	
	return "On a " + day;
}