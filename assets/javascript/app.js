var questions = ["What was my favorite car growing up?"];
var timeRemaining;
var questionCounter = 0;



function start() {
	$(".start").remove();
	$("<h1 class='timeRemaining'>Time Remaining: <span id='timeRemaining'>30</span> seconds</h1>").insertAfter($(".main-header"));
	$("<h1 class='question'></h1>").insertAfter($(".timeRemaining"));
	timer();
	nextQuestion();
}

function timer() {
	
		var intervalID = setInterval(function(){ 
		if(timeRemaining > 0) {	
			timeRemaining--;
			$("#timeRemaining").text(timeRemaining);
		}
		else {
			alert("Time's Up!");
			clearInterval(intervalID);
		}
		}, 1000);


}

function nextQuestion() {
	timeRemaining = 30;
	$(".question").text(questions[questionCounter]);
	questonCounter++;
}



///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////

$(".start").on("click", start);


