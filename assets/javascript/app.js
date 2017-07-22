var questions = [];
questions[0] = "What does BMW stand for?";
questions[1] = "With Tesla's new 'Ludicrous Mode', the Model S P100D can reach 60MPH from a dead stop in __?"
questions[2] = "Reaching speeds of 420 km/h, how many turbochargers does the new Buggati Chiron have?"
questions[3] = "What car maker produced the first car to acheive a perfect weight (kg) to power (hp) ratio of 1:1?"
questions[4] = "Which american muscle icon had a roof so tough, that it broke the crushing machine in the roof crush test?";
questions[5] = "Formula One car's exhaust can reach temperatures of _____?";
questions[6] = "The average Formula 1 pit stop is less than _____ seconds.";
questions[7] = "The most stolen car in the United States is the _____.";
questions[8] = "In 2008, a 1961 Ferrari California Spyder became the most expensive car sold at a vintage car auction for _____ after the deduction of the auction fees.";
questions[9] = "The fastest known speeding ticket was issued in May 2003 in Texas. The motorist was operating a Koenigseggs CCR, a Swedish sports car and was allegedly going ___.";

var choices = [];
choices[0] = ["Berlin Motor Works", "Bavarian Motor Works", "Borgholzhausen Motor Works", "Brunswick Motor Works"];
choices[1] = ["1.5 seconds", "2.3 seconds", "3.0 seconds", "4.2 seconds"];
choices[2] = ["0", "4", "2", "8"];
choices[3] = ["Lamborghini", "Bugatti", "Pagani", "Koenigsegg"];
choices[4] = ["Dodge Charger", "Ford GT", "Chevrolet Camaro", "Plymouth Road Runner"];
choices[5] = ["200 degrees celcius", "400 degrees celcius", "800 degrees celcius", "1000 degrees celcius"];
choices[6] = ["3", "5", "8", "10"];
choices[7] = ["Toyota Camry", "Ford Fusion", "Honda Accord", "Mercedes Benz E350"];
choices[8] = ["$10.9 Million USD", "$4.5 million USD", "25.6 Million USD", "17.3 Million USD"];
choices[9] = ["162 MPH", "197 MPH", "242 MPH", "259 MPH"];


var answers = [];
answers[0] = "Bavarian Motor Works";
answers[1] = "2.3 seconds"; 
answers[2] = "4"; 
answers[3] = "Koenigsegg"; 
answers[4] = "Ford GT"; 
answers[5] = "1000 degrees celcius"; 
answers[6] = "3"; 
answers[7] = "Honda Accord"; 
answers[8] = "$10.9 Million USD"; 
answers[9] = "242 MPH"; 


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
	$(".live-box").append($("<h1 class='question'></h1>"));
	$(".live-box").append($("<div class='choices'></div>"));
	nextQuestion();
}

function thirtySecTimer() {

		timeRemaining = 30;
    $(".live-box").prepend($("<h1 class='timeRemaining'>Time Remaining: <span id='timeRemaining'>30</span> seconds</h1>"));
		$("#timeRemaining").text(timeRemaining);
		intervalID = setInterval(function(){ 
		
		if(timeRemaining > 0) {	
			timeRemaining--;
			$("#timeRemaining").text(timeRemaining);
		}
		else {
			unanswered++;
			clearInterval(intervalID);
			nextQuestion();
		}
		}, 1000);

}

function nextQuestion() {
	$(".gifHead").remove();
	$(".giffy").remove();
  $(".timeRemaining").remove();
	clearInterval(intervalID);

	thirtySecTimer();

	 // If all questions have been answered
	if(questionCounter === arrayLength) {
		$(".live-box").empty();
		calculateResults();
	}
	
	$(".choices").empty();
	$(".question").text(questions[questionCounter]);

	for (var i = 0; i < 4; i++) {
		
		$(".choices").append("<div class='answerChoice'>" + choices[questionCounter][i] + "</div>") - 1;
	
	}
	questionCounter++;
}

function transition() {
	setTimeout(nextQuestion, 4000);
	if(userGuess === answers[questionCounter - 1]){
	$(".live-box").append($("<h1 class='gifHead'>Correct!</h1>"));
	$(".live-box").append($("<img height='300px' class='giffy' src='assets/images/" + (questionCounter -1) + ".gif'>"));
	} else {
		$(".live-box").append($("<h1 class='gifHead'>Wrong Answer! It was " + answers[questionCounter - 1] + "</h1>"));
		$(".live-box").append($("<img height='300px' class='giffy' src='assets/images/wrong.gif'>"));
	}
		
	$(".timeRemaining").empty();
	$(".question").empty();
	$(".choices").empty();

}


function gradeQuestion() {

	userGuess = $(this).text();
	
	if(userGuess === answers[questionCounter - 1]){
		correct++;
		transition();

		// nextQuestion();

	} else {
		incorrect++;
		transition();
	}
}

function calculateResults(){
	
	clearInterval(intervalID);

	$(".live-box").empty();

	// $(".live-box").css({"background-color":"#465554", "width":"75%", "margin":"15% auto", "color":"#71DCD3", "border-radius":"10px"});

	$(".live-box").append($("<h1 class='finished'>All done, here's how you did!</h1>"));
	$(".live-box").append($("<h3 class='correct'>Correct: <span id='correct'>0</span></h3>"));
	$(".live-box").append($("<h3 class='incorrect'>Incorrect: <span id='incorrect'>0</span></h3>"));
	$(".live-box").append($("<h3 class='unanswered'>Unanswered: <span id='unanswered'>0</span></h3>"));
	$(".live-box").append($("<button id='playAgain'>Play again?</button>"));

	$("#correct").text(correct);
	$("#incorrect").text(incorrect);
	$("#unanswered").text(unanswered);
}

function reset() {
	questionCounter = 0;
	correct = 0;
	incorrect = 0;
	unanswered = 0;
console.log("reset");

$(".live-box").empty();
	
	$(".live-box").append($("<h1 class='timeRemaining'>Time Remaining: <span id='timeRemaining'>30</span> seconds</h1>"));
	$(".live-box").append($("<h1 class='question'></h1>"));
	$(".live-box").append($("<div class='choices'></div>"));
	
	nextQuestion();
}






///////////////////////////////////////////////////
///////////////////////////////////////////////////
///////////////////////////////////////////////////
$("<div class='start'>Start</div>").insertAfter($(".main-header"));
$(document.body).on('click', '.start' , start);
$(document.body).on('click', '.answerChoice' , gradeQuestion);

$(document.body).on('click', '#playAgain' , reset);




