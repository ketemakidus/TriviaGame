$(document).ready(function () {

  $("#timeLeft").hide();
  $("#begin").on("click", trivia.beginGame);
  $(document).on("click", ".option", trivia.guessChecker);

})

var trivia = {

  correct: 0,
  incorrect: 0,
  unanswered: 0,
  currentSet: 0,
  timer: 20,
  timerOn: false,
  timerId: "",

  questions: {
    q1: " What type of museum is featured in Night at the Museum?",
    q2: "Which 1997 film was the first movie with a $200,000,000 budget?",
    q3: "In what film would you find Matt Damon singing My Funny Valentine?",
    q4: "Which play was performed for Queen Elizabeth at the start of Shakespeare in Love?",
  },

  options: {
    q1: ["Art", "Avation", "science", "Natural history"],
    q2: ["face/off", "Titanic", "men in black", "L.A.Confidental"],
    q3: ["The bourne identity", "The departed", "The talented mr.Ripley", "Good will Hunting"],
    q4: ["Hamlet", "Two Gentlemen Of Verona", "A Midsummer Night's Dream", "Romeo And Juliet"],
  },

  answers: {
    q1: "Natural history",
    q2: "Titanic",
    q3: "The talented mr.Ripley",
    q4: "Hamlet",
  },

  beginGame: function () {
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);

    $("#game").show();
    $("#answers").html("");
    $("#timer").text(trivia.timer);
    $("#begin").hide();
    $("#timeLeft").show();

    trivia.nextQuestion();
  },

  // next quesion

  nextQuestion: function () {

    trivia.timer = 10;
    $("#timer").removeClass("last-seconds");
    $("#timer").text(trivia.timer);

    if (!trivia.timerOn) {
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }

    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $("#question").text(questionContent);

    var questionOptions = Object.values(trivia.options)[trivia.currentSet];

    $.each(questionOptions, function (index, key) {
      $("#options").append($('<button class= "option btn btn-info btn-lg">' + key + '</button>'));
    })

  },

  timerRunning: function () {

    if (trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length) {
      $("#timer").text(trivia.timer);
      trivia.timer--;
      if (trivia.timer === 4) {
        $("#timer").addClass("last-seconds");
      }

    } else if (trivia.timer === -1) {
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Out of time! The correct answer is " + Object.values(trivia.answers)[trivia.currentSet] + "</h3>");
      
    } else if (trivia.currentSet === Object.keys(trivia.questions).length) {

      $("#answers")
        .html("" + "<p>Correct: " + trivia.correct + "</p>" +
          "<p>Incorrect: " + trivia.incorrect + "</p>" +
          "<p>Unaswered: " + trivia.unanswered + "</p>");

      $("#game").hide();
      $("#begin").show();
    }

  },

  guessChecker: function () {

    var resultId;
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];

    if ($(this).text() === currentAnswer) {

      $(this).addClass("btn-success").removeClass("btn-info");

      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Congratulations You Guessed The Correct Answer!</h3>");
    } else {

      $(this).addClass("btn-danger").removeClass("btn-info");

      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $("#answers").html("<h3>Nope, The Correct Answer Is: " + currentAnswer + "</h3>");
    }

  },

  guessResult: function () {
    trivia.currentSet++;
    $(".option").remove();
    $("#answers h3").remove();
    trivia.nextQuestion();

  }

}
