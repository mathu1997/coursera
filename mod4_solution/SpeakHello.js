
var helloSpeaker = function(x){
	var speakWord = "Hello";
	speak(x);
	function speak(name) {
	  console.log(speakWord + " " + name);
	}
};