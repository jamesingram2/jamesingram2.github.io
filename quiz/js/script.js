function submitAnswers() {
	var total = 5;
	var score = 0;

	// Get User Input
	var q1 = document.forms["quizForm"]["q1"].value;
	var q2 = document.forms["quizForm"]["q2"].value;
	var q3 = document.forms["quizForm"]["q3"].value;
	var q4 = document.forms["quizForm"]["q4"].value;
	var q5 = document.forms["quizForm"]["q5"].value;

	// Validation
	for(i = 1; i <= total; i++){
		if(!eval('q' + i)){
			alert('Please answer question ' + i);
			return false;
		}
	}

	// Set Correct Answers
	var answers = new Array();
	answers = ["b","a","d","b","d"];

	if (q1 == answers[0]){
		score++
	}
	if (q2 == answers[1]){
		score++
	}
	if (q3 == answers[2]){
		score++
	}
	if (q4 == answers[3]){
		score++
	}
	if (q5 == answers[4]){
		score++
	}
	
	// Display ResultsS
	var percentage = score/total * 100;

	var results = document.getElementById('results');
	results.innerHTML = '<h3>You scored <span>'+score+'</span> out of <span>'+total+ '<br>'+percentage+ '&percnt;'+'</span></h3>';
	alert('You scored ' +score+ ' out of ' +total);

	return false;
}
