var words = ["What", "are", "your", "commands", "?"];

$(document).ready(function () {
	applySettings();
	triangleFade();
	startTimeMonitoring();
});

function triangleFade() {
	$(".samaritan-triangle").fadeOut(triangleFadeSpeed, function() {
        $(this).fadeIn(triangleFadeSpeed, triangleFade());
    });
}

function speak(word) {
	$(".samaritan-text span").html(word.toUpperCase());
}

function stopSpeaking() {
	$(".samaritan-text span").html("&nbsp;");
}

function sayPhrase() {
	setTimeout(function() {
		var timer = 0;
		
		for (var word in words) {
			setSpeakDelay(words[word], timer);
			timer += 750;
		}
		
		setTimeout(function() {
			stopSpeaking();
		}, timer);
		
		sayPhrase();
	}, 15000);
}

function setSpeakDelay(word, time) {
	setTimeout(function() {
		speak(word);
	}, time);
}

function setStopSpeakingDelay(time) {
	setTimeout(function() {
		stopSpeaking();
	}, time);
}

function startTimeMonitoring() {
	setInterval(function () {
		speak(getCurrentDateAsSamaritanFriendlyString());
	}, 1000);
}

function getCurrentDateAsSamaritanFriendlyString() {
	var date = new Date();
	
	return date.getDate() + "." + (date.getMonth() + 1) + "." + date.getFullYear() + " " + date.getHours() + "." + (date.getMinutes()) + "." + date.getSeconds();
}

function applySettings() {
	$(document.body).addClass(colourMode.CSS);
}