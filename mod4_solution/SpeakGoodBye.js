// NOTE! The steps in this file are basically identical to the ones you
// performed in the SpeakHello.js file.

var byeSpeaker = function(x){
	var speakWord = "Good Bye";
	speak(x);
	function speak(name) {
	  console.log(speakWord + " " + name);
	}
};