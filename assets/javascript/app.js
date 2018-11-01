$(document).ready(function () {


// create an on click function with a button to start game 
//create timer for game 
//select questions and right answers
//after timer stop //stop quiz 
//only one answer to click wait for the user to finish quiz // stop quiz 
//reset quiz button
//display correct answers
//display incorrect answers
//display unanswered questions 

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess = "";
var running = false;
var qCount = 9;
var pick;
var index;
var newArray = [];
var holder = [];

var selections = [{
question: "What is the name of the blond girl in the Big Bang Theory",
choice:["Alicia", "Velma", "Penny", "Amy" ],
answer: 2,
image: "assets/images/bbt.gif"

}, {
question:"What is the name of the TV show that had a character named Sansa Stark?",
choice:["Shameless", "Lord of the Rings", "Westworld", "Game of Thrones"],
answer: 3,
// image: ""

}, {
question:"In what TV show there is a character named Stewie?",
choice:["Family Guy", "American Dad", "Rick and Morty", "Robot Chicken"],
answer: 0,
// image: ""

}, {
question:"In Friends what is the last name of the two Friends that are siblings?",
choice:["Gallagher", "Geller", "Green", "Goller"],
answer: 1,
// image: ""

}, {
question:"Who is the Family Guy?",
choice:["Stan Lee", "Fred Flinstone", "Peter Griffin", "Brian Griffin"],
answer: 2,
image: "assets/images/peterg.gif"

}, {
question:"Who is the Marvel Superhero named Matt Murdock?",
choice:["Flash", "Batman", "Hulk", "Daredevil"],
answer: 3,
// image: ""

}, {
question:"In Breaking Bad, What is the name of the Scientist?",
choice:["Walter Black", "Jesse Whiteman", "Walter White", "Walt Whitman"],
answer: 2,
// image: ""

}, {
question:"What is the show that has Winona Rider as one of the main characters?",
choice:["American Horror Story", "Stranger Things", "Westworld", "Daredevil"],
answer: 1,
// image: ""

}, {
question:"What is the show that is based on Druglords?",
choice:["Friends", "Shooter", "Narcos", "Shameless"],
answer: 2,
// image: ""

}

];


$("#reset").hide();

//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < selections.length; i++) {
	holder.push(selections[i]);
}
	})

//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}


//timer countdown
function decrement() {
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
	timer --;

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerhere").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}

//randomly pick question in array if not already shown
//display question and loop though and display possible answers

function displayQuestion() {
	//generate random index in selection array
	index = Math.floor(Math.random()*selections.length);
	pick = selections[index];


	//iterate through answer array and display
	$("#questionhere").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerhere").append(userChoice);
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerhere").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerhere").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerhere").append("<img src=" + pick.image + ">");
	newArray.push(pick);
	selections.splice(index,1);

	setTimeout(function() {
		$("#answerhere").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#timeleft").empty();
		$("#questionhere").empty();
		$("#questionhere").html("<h3>Game Over!</h3>");
		$("#answerhere").append("<h4> Correct Answers: " + correctCount + "</h4>" );
		$("#answerhere").append("<h4> Incorrect Answers: " + wrongCount + "</h4>" );
		$("#answerhere").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;


	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerhere").empty();
	$("#questionhere").empty();
	for(var i = 0; i < holder.length; i++) {
		selections.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})