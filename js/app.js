$(document).ready(function () {
    "use strict";

    // initialize the global variables
    const questionTime = 20;
    var correct = 0;
    var incorrect = 0;
    var remaining = 7;
    var curTime = questionTime;
    var timerInterval = "";
    var questionCounter = 0;
    var clicked = false;
    var delayTime = 0;

    // hide parts of the page that aren't used until the game is started
    $("#status").hide();
    $("#game_area").hide();

    // create question objects
    var question00 = {
        question: "In how many seasons did Lou Gehrig play every inning of every game?",
        a: "0",
        b: "1",
        c: "3",
        d: "5",
        correct: "b",
        explain: "Even though Gehrig did play in every game for 13 consecutive seasons, he only played in every inning of every game in a season 1 time."
    }
    var question01 = {
        question: "Who was the last National League player to win the Triple Crown?",
        a: "Willie Mays",
        b: "Hank Aaron",
        c: "Joe Medwick",
        d: "Barry Bonds",
        correct: "c",
        explain: "Medwick was the last National League Triple crown winner... way back in 1937. The American League has had 6 Triple Crown winners since that time."
    }
    var question02 = {
        question: "Who was the last major league pitcher to win 30 games in a season?",
        a: "Denny McLain",
        b: "Nolan Ryan",
        c: "Roger Clemens",
        d: "Bob Feller",
        correct: "a",
        explain: "McLain went 31-6 in 1968. No pitcher has won more than 27 games since 1968."
    }
    var question03 = {
        question: "What was their nickname of the Texas Rangers' original franchise?",
        a: "Browns",
        b: "Colt 45s",
        c: "Pilots",
        d: "Senators",
        correct: "d",
        explain: "The Texas Rangers were founded in Washington DC in 1961 as the Washington Senators. They moved to Texas and became the Rangers in 1972."
    }
    var question04 = {
        question: "Who was the last player to hit .400 in back-to-back seasons?",
        a: "Rogers Hornsby",
        b: "Ted Williams",
        c: "Ty Cobb",
        d: "Honus Wagner",
        correct: "a",
        explain: "Even though two other player had accomplished the feat prior to Hornsby, he was the last player to do it... hitting .424 and .403 in 1924 and 1925 respectively."
    }
    var question05 = {
        question: "Which team won the most World Series during the 1990's",
        a: "Yankees",
        b: "Blue Jays",
        c: "Braves",
        d: "Reds",
        correct: "a",
        explain: "The Yankees won the World Series 3 times during the 1990's. The Blue Jays were the only other team to win it more than once."
    }
    var question06 = {
        question: "Who is the only player with 30 homers and 100 RBIs in a season for five different teams?",
        a: "Larry Walker",
        b: "Jim Rice",
        c: "Albert Pujols",
        d: "Gary Sheffield",
        correct: "d",
        explain: "From 1992 through 2004, Sheffield did it for the Padres, Marlins, Dodgers (twice), Braves and Yankees (twice)."
    }
    var question07 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question08 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question09 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question10 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question11 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question12 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question13 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question14 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question15 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question16 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question17 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question18 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question19 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }
    var question20 = {
        question: "",
        a: "",
        b: "",
        c: "",
        d: "",
        correct: "",
        explain: ""
    }

    var questions = [question00, question01, question02, question03, question04, question05, question06];

    function timeEnded(outcome) {
        $("#time_text").addClass("text-dark");
        remaining--;
        $("#remaining").text(remaining);
        if (outcome == "expired" || outcome == "wrong") {
            incorrect++;
            $("#incorrect").text(incorrect);
            var tempValue = questions[questionCounter].correct;
            $(".answer[value=" + tempValue + "]").addClass("bg_correct");
            $(".answer[value=" + tempValue + "]").append("<span class='ml-4'> (Correct Answer)</span>");
            delayTime = 5000;
        } else {
            correct++;
            $("#correct").text(correct);
            delayTime = 2000;
        }
        questionCounter++;
        if (remaining > 0) {
            setTimeout(function () {
                $(".answer").removeClass("bg_correct bg_incorrect")
                clicked = false;
                newQuestion(questionCounter);
            }, delayTime);
        } else {
            setTimeout(function () {
                $("#status").hide();
                $("#game_area").hide();
                $("#attract_text").show();
            }, 5000);

            $("#start_btn").fadeIn(500);
        }
    }

    function runTimer() {
        // update the timer countdown every second
        curTime--;
        if (curTime <= 5) {
            $("#time_text").addClass("text-danger");
        }
        $("#time_text").text("Time Remaining: " + curTime);
        if (curTime == 0) {
            clearInterval(timerInterval);
            timeEnded("expired");
        }
    }

    function newQuestion() {
        curTime = questionTime;
        // start the countdown timer
        timerInterval = setInterval(runTimer, 1000);
        $("#time_text").text("Time Remaining: " + curTime);
        // show the current question and answer
        $("#question_text").text(questions[questionCounter].question);
        $("#a_text").text("A. " + questions[questionCounter].a);
        $("#b_text").text("B. " + questions[questionCounter].b);
        $("#c_text").text("C. " + questions[questionCounter].c);
        $("#d_text").text("D. " + questions[questionCounter].d);
        $(".answer").on("click", function () {
            clearInterval(timerInterval);
            if (curTime > 0 && !clicked) {
                clicked = true;
                // the player selected an answer and the timer is still above 0 seconds remaining
                if (this.value == questions[questionCounter].correct) {
                    $(this).addClass("bg_correct");
                    $(this).append("<span class='ml-4 fw_bolder'> Correct!</span>");
                    timeEnded("right");
                } else {
                    $(this).addClass("bg_incorrect");
                    $(this).append("<span class='ml-4 fw_bolder'> Incorrect!</span>");
                    timeEnded("wrong");
                }
            }
        });
    }

    $("#start_btn").on("click", function () {
        correct = 0;
        incorrect = 0;
        remaining = 7;
        $("#correct").text(correct);
        $("#incorrect").text(incorrect);
        $("#remaining").text(remaining);
        clicked = false;
        $(".answer").removeClass("bg_correct bg_incorrect")
        $("#start_btn").fadeOut(500);
        $("#attract_text").hide();
        $("#status").show();
        $("#game_area").show();
        questionCounter = 0;
        newQuestion();
    });

});