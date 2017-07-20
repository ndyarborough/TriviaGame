var questions = [];
questions[0] = "What does BMW stand for?";
questions[1] = "With Tesla's new 'Ludicrous Mode', the Model S P100D can reach 60MPH from a dead stop in __?"
questions[2] = "Reaching speeds of 420 km/h, how many turbochargers does the new Buggati Chiron have?"
questions[3] = "What car maker produced the first car to acheive a perfect weight (kg) to power (hp) ratio of 1:1?"

var choices = [];
choices[0] = ["Berlin Motor Works", "Bavarian Motor Works", "Borgholzhausen Motor Works", "Brunswick Motor Works"];
choices[1] = ["1.5 seconds", "2.3 seconds", "3.0 seconds", "4.2 seconds"];
choices[2] = ["0", "4", "2", "8"];
choices[3] = ["Lamborghini", "Bugatti", "Pagani", "Koenigsegg"];

var answers = [];
answers[0] = "Bavarian Motor Works";
answers[1] = "2.3 seconds"; 
answers[2] = "4"; 
answers[3] = "Koenigsegg"; 

var timeRemaining;
var questionCounter = 0;
var correct = 0;
var incorrect = 0;
var unanswered = 0;
var arrayLength = questions.length;
var intervalID;



function start() {
	$(".start").remove()
	$("<div class='live-box'></div>").insertAfter($(".main-header"));
	$(".live-box").append($("<h1 class='timeRemaining'>Time Remaining: <span id='timeRemaining'>30</span> seconds</h1>"));
	$(".live-box").append($("<h1 class='question'></h1>"));
	$(".live-box").append($("<div class='choices'></div>"));
	
	thirtySecTimer();
	nextQuestion();
}

function thirtySecTimer() {

		timeRemaining = 30;
		$("#timeRemaining").text(timeRemaining);
		intervalID = setInterval(function(){ 
		
		if(timeRemaining > 0) {	
			timeRemaining--;
			$("#timeRemaining").text(timeRemaining);
			console.log(timeRemaining);
		}
		else {
			// alert("Time's Up!");
			unanswered++;
			clearInterval(intervalID);
			thirtySecTimer();
			nextQuestion();
		}
		}, 1000);

}

function nextQuestion() {
	
	$(".choices").empty();
	$(".question").text(questions[questionCounter]);

	 // If all questions have been answered
	if(questionCounter === arrayLength) {
		calculateResults();
	}
	
	for (var i = 0; i < 4; i++) {
		
		console.log(questionCounter);
		$(".choices").append("<div class='answerChoice'>" + choices[questionCounter][i] + "</div>" + "<br>") - 1;
	
	}
	questionCounter++;
}

function gradeQuestion() {

	userGuess = $(this).text();
	
	if(userGuess === answers[questionCounter - 1]){
		correct++;
		nextQuestion();
	} else {
		incorrect++;
		nextQuestion();
	}
}

function calculateResults(){
	clearInterval(intervalID);
	$(".live-box").empty();

	$(".live-box").append($("<h1 class='finished'>All done, here's how you did!</h1>"));
	$(".live-box").append($("<h3 class='correct'>Correct: <span id='correct'>0</span></h3>"));
	$(".live-box").append($("<h3 class='incorrect'>Incorrect: <span id='incorrect'>0</span></h3>"));
	$(".live-box").append($("<h3 class='unanswered'>Unanswered: <span id='unanswered'>0</span></h3>"));
	$(".live-box").append($("<button id='playAgain'>Play again?</button>"));


	// $("<h1 class='finished'>All done, here's how you did!</h1>").insertAfter($(".main-header"));
	// $("<h3 class='correct'>Correct: <span id='correct'>0</span></h3>").insertAfter($(".finished"));
	// $("<h3 class='incorrect'>Incorrect: <span id='incorrect'>0</span></h3><br>").insertAfter($(".correct"));
	// $("<h3 class='unanswered'>Unanswered: <span id='unanswered'>0</span></h3>").insertAfter($(".incorrect"));
	// $("<button id='playAgain'>Play again?</button>").insertAfter($(".unanswered"));

	$("#correct").text(correct);
	$("#incorrect").text(incorrect);
	$("#unanswered").text(unanswered);
}

function reset() {
	questionCounter = 0;
	alert("reset");
	correct = 0;
	incorrect = 0;
	unanswered = 0;

	$(".live-box").empty();

	$("<h1 class='timeRemaining'>Time Remaining: <span id='timeRemaining'>30</span> seconds</h1>").insertAfter($(".main-header"));
	$("<h1 class='question'></h1>").insertAfter($(".timeRemaining"));
	$("<div class='choices'></div>").insertAfter($(".question"));

	thirtySecTimer();
	nextQuestion();

}






///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
$("<div class='start'>Start</div>").insertAfter($(".main-header"));
$(document.body).on('click', '.start' , start);
$(document.body).on('click', '.answerChoice' , gradeQuestion);

$(document.body).on('click', '#playAgain' , reset);




