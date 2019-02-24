$(document).ready(function () {
    "use strict";

    // initialize variables in the global scope
    const questionTime = 20;
    const questionsGame = 10;
    var correct = 0;
    var incorrect = 0;
    var remaining = 0;
    var curTime = questionTime;
    var timerInterval = "";
    var questionCounter = 0;
    var clicked = false;
    var delayTime = 0;
    var briefInterval = "";
    var briefTime = 0;
    var briefDismiss = "";
    var endInterval = "";
    var extra_text = "";
    var endTime = 0;
    var endDismiss = "";
    var gameover = true;

    // hide parts of the page that aren't used until the game is started
    $("#game_area").hide();
    $("#briefDiv").hide();

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
        question: "Which player led Major League Baseball in homers a record 6 consecutive years?",
        a: "Mike Schmidt",
        b: "Alex Rodriguez",
        c: "Ralph Kiner",
        d: "Hank Aaron",
        correct: "c",
        explain: "From 1947 to 1952, Ralph Kiner was the Home Run leader. A back injury forced him to retire at the age of 32, finishing his career with 369 home runs and 1019 RBI."
    }
    var question08 = {
        question: "Which left-handed pitcher led the American League in strikeouts seven years in a row?",
        a: "Lefty Grove",
        b: "Sandy Koufax",
        c: "Whitey Ford",
        d: "Randy Johnson",
        correct: "a",
        explain: "Lefty Grove led the American League in wins in four separate seasons, in strikeouts seven years in a row, and had the league's lowest earned run average a record nine times."
    }
    var question09 = {
        question: "Who was the first player to reach 50 doubles and 50 home runs in the same season?",
        a: "Albert Belle",
        b: "Alex Rodriguez",
        c: "Mark McGwire",
        d: "Babe Ruth",
        correct: "a",
        explain: "In 1995, Cleveland's Albert Belle had 52 doubles and 50 home runs."
    }
    var question10 = {
        question: "Who was the youngest MLB player to win the MVP?",
        a: "Johnny Bench",
        b: "Stan Musial",
        c: "Vida Blue",
        d: "Bryce Harper",
        correct: "c",
        explain: "In 1971, Vida Blue became the youngest player (22 years, 64 days) in MLB history to win MVP."
    }
    var question11 = {
        question: "What player has the longest hitting streak?",
        a: "Pete Rose",
        b: "Ty Cobb",
        c: "Joe Dimaggio",
        d: "George Sisler",
        correct: "c",
        explain: "Joe DiMaggio's most famous achievement is his MLB record-breaking 56-game hitting streak in 1941."
    }
    var question12 = {
        question: "Who was baseball's first 300 game winner?",
        a: "Fergie Jenkins",
        b: "Pud Galvin",
        c: "Cy Young",
        d: "Lefty Grove",
        correct: "b",
        explain: "Galvin was MLB's first 300-game winner... winning his final game in 1892. He was inducted into the Baseball Hall of Fame in 1965."
    }
    var question13 = {
        question: "Who holds the record for most at bats in a season?",
        a: "Ichiro Suzuki",
        b: "Jose Reyes",
        c: "Jimmy Rollins",
        d: "Willie Wilson",
        correct: "c",
        explain: "In 2007, Philadelphia Phillies shortstop Jimmy Rollins set a Major League record with 716 at bats, eclipsing the previous mark of 705 set by Willie Wilson in 1980."
    }
    var question14 = {
        question: "What player holds the record for most stolen bases in a season?",
        a: "Rickey Henderson",
        b: "Hugh Nicol",
        c: "Lou Brock",
        d: "Vince Coleman",
        correct: "a",
        explain: "In 1982, Rickey Henderson broke Lou Brock's major league single season record by stealing 130 bases... a total which has not been approached since."
    }
    var question15 = {
        question: "Who is the only New York Yankee to win both the Rookie of the Year and Most Valuable Player awards?",
        a: "Dave Righetti",
        b: "Alex Rodriguez",
        c: "Mickey Mantle",
        d: "Thurman Munson",
        correct: "d",
        explain: "Thurman Munson was named the first Yankees' team captain since Lou Gehrig. He led the Yankees to three consecutive World Series appearances from 1976 to 1978 (winning the latter two)."
    }
    var question16 = {
        question: "Who is the only pitcher in major league history to record both 200 wins and 150 saves?",
        a: "Wilbur Wood",
        b: "John Smoltz",
        c: "Dennis Eckersley",
        d: "Mariano Rivera",
        correct: "b",
        explain: "John Smoltz was converted to a reliever in 2001 following his recovery from Tommy John surgery. In 2002, he set the National League record with 55 saves."
    }
    var question17 = {
        question: "What player holds the record for most hits in a season?",
        a: "Darin Erstad",
        b: "George Sisler",
        c: "Ichiro Suzuki",
        d: "Lefy O'Doul",
        correct: "c",
        explain: "Ichiro Suzuki finished the 2004 season with a record 262 hits, giving him the single-season records for both the United States and Japanese baseball."
    }
    var question18 = {
        question: "Who was the first reliever elected to the Hall of Fame?",
        a: "Dennis Eckersly",
        b: "Rollie Fingers",
        c: "Goose Gossage",
        d: "Hoyt Wilhelm",
        correct: "d",
        explain: "Hoyt Wilhelm was nearly 30 years old when he entered the Major Leagues and pitched until he was nearly 50."
    }
    var question19 = {
        question: "What player was killed by a pitch from Yankees pitcher Carl Mays?",
        a: "Tony Conigliaro",
        b: "Bryce Florie",
        c: "Herb Score",
        d: "Ray Chapman",
        correct: "d",
        explain: "On August 16, 1920, Ray Chapman was hit in the head by a pitch from Carl Mays and died 12 hours later."
    }
    var question20 = {
        question: "What Baltimore Orioles manager was ejected from a record 91 games?",
        a: "Mike Hargrove",
        b: "Earl Weaver",
        c: "Hank Bauer",
        d: "Paul Richards",
        correct: "b",
        explain: "Earl Weaver was ejected from a major-league record 91 games in his 17 years as the Orioles manager. He was once ejected from both games of a double header!"
    }

    var question21 = {
        question: "Where is the Baseball Hall of Fame and National Museum located?",
        a: "Cooperstown, NY",
        b: "Boston, MA",
        c: "Baltimore, MD",
        d: "Cleveland, OH",
        correct: "a",
        explain: "The Baseball Hall of Fame opened in Cooperstown, NY in 1939."
    }

    var question22 = {
        question: "Who was the only pitcher to pitch a perfect game in a World Series?",
        a: "David Wells",
        b: "Sandy Koufax",
        c: "Don Larsen",
        d: "Dennis Martinez",
        correct: "c",
        explain: "Don Larsen of the New York Yankees pitched a perfect game during the 1956 World Series."
    }

    var question23 = {
        question: "Which pitcher has struck the most batters in their career?",
        a: "Roger Clemens",
        b: "Tom Seaver",
        c: "Nolan Ryan",
        d: "Cy Young",
        correct: "c",
        explain: "Nolan Ryan played 27 seasons in major league baseball and struck out 5,714 batters."
    }

    var question24 = {
        question: "Which player had the most RBI in a single season?",
        a: "Hack Wilson",
        b: "Lou Gehrig",
        c: "Hank Greenberg",
        d: "Jimmie Foxx",
        correct: "a",
        explain: "In 1930, the 5'6\" Chicago Cubs' outfielder, Hack Wilson had 191 RBI."
    }

    var question25 = {
        question: "Which pitcher led their league in wins the most times in their career?",
        a: "Grover Cleveland Alexander",
        b: "Bob Feller",
        c: "Walter Johnson",
        d: "Warren Spahn",
        correct: "c",
        explain: "Warren Spahn led the National League in wins 8 times between 1949 and 1961."
    }

    var question26 = {
        question: "Which of these players was not a member of the first Baseball Hall of Fame class?",
        a: "Cy Young",
        b: "Christy Mathewson",
        c: "Ty Cobb",
        d: "Base Ruth",
        correct: "a",
        explain: "Even though he had 511 career wins, Young had to wait an extra year before being inducted in 1937."
    }

    var question27 = {
        question: "What pitcher set a major league record in 1988 by pitching 59 consecutive innings without allowing a run?",
        a: "Bret Saberhagen",
        b: "Dwight Gooden",
        c: "Frank Viola",
        d: "Orel Hershiser",
        correct: "d",
        explain: "In 1988, Hershiser helped lead the Dodgers to a World Series championship, was named World Series MVP, won the National League Cy Young Award and the National League Gold Glove Award."
    }

    var question28 = {
        question: "What MLB player was known as 'Mr. Tiger'?",
        a: "Ty Cobb",
        b: "Al Kaline",
        c: "Hank Greenberg",
        d: "Charlie Gehringer",
        correct: "b",
        explain: "Al Kaline played his entire 22-year baseball career with the Detroit Tigers, mainly as a right fielder where he won ten Gold Gloves."
    }

    var question29 = {
        question: "What was Babe Ruth's real first name?",
        a: "William",
        b: "Richard",
        c: "George",
        d: "Henry",
        correct: "c",
        explain: "Ruth's full name was George Herman Ruth, Jr."
    }

    var questions = [question00, question01, question02, question03, question04, question05, question06, question07, question08, question09, question10, question11, question12, question13, question14, question15, question16, question17, question18, question19, question20, question21, question22, question23, question24, question25, question26, question27, question28, question29];

    questions.sort(function() { return 0.5 - Math.random() });
    console.log(questions);

    function endTimer() {
        endTime--;
        $("#briefTime").text("Closes in: " + endTime + " sec");
        if (endTime == 0) {
            clearInterval(endInterval);
        }
    }

    function endTimeout(eT) {
        $("#pause").on("click", function () {
            if (gameover) {
                clearTimeout(endDismiss);
            clearInterval(endInterval);
            $("#briefTime").hide();
            $(".spacer_bar").hide();
            $("#pause").hide();
            }
        });
        $("#dismiss").on("click", function () {
            if (gameover) {
                clearTimeout(endDismiss);
            clearInterval(endInterval);
            endTimeout(0);
            }
        });
        $("#question_card").hide();
        $("#briefTime").show();
        $(".spacer_bar").show();
        $("#pause").show();
        $("#briefDiv").addClass("end_brief");
        if (correct <= (.3 * questionsGame)) {
            extra_text = "Maybe you should try playing a different kind of trivia game."
        } else if (correct <= (.5 * questionsGame)) {
            extra_text = "Maybe you're a little rusty. Try playing again."
        } else if (correct <= (.7 * questionsGame)) {
            extra_text = "Not too shabby!."
        } else {
            extra_text = "Great job! You're obviously a baseball fan."
        }
        $("#brief_review").html("You've answered " + correct + " of the " + questionsGame + " questions correctly.<br /><br />" + extra_text);
        endDismiss = setTimeout(function () {
            $("#game_area").hide();
            $("#attract_text").show();
            $("#start_btn").show();
        }, eT);
    }

    function briefTimeout(dT) {
        $("#pause").on("click", function () {
            if (!gameover) {
                clearTimeout(briefDismiss);
            clearInterval(briefInterval);
            $("#briefTime").hide();
            $(".spacer_bar").hide();
            $("#pause").hide();
            }
        });
        $("#dismiss").on("click", function () {
            if (!gameover) {
                clearTimeout(briefDismiss);
            clearInterval(briefInterval);
            briefTimeout(0);
            }
        });
        briefDismiss = setTimeout(function () {
            if (remaining > 0) {
                $(".answer").removeClass("bg_correct bg_incorrect")
                clicked = false;
                newQuestion(questionCounter);
            } else {
                gameover = true;
                delayTime = 10000;
                endTime = delayTime / 1000;
                $("#briefTime").show();
                $("#briefTime").text("Closes in: " + endTime + " sec");
                endInterval = setInterval(endTimer, 1000);
                endTimeout(delayTime);
            }
        }, dT);
    }

    function briefTimer() {
        briefTime--;
        $("#briefTime").text("Closes in: " + briefTime + " sec");
        if (briefTime == 0) {
            clearInterval(briefInterval);
        }
    }

    function timeEnded(outcome) {
        remaining--;
        $("#remaining").text(remaining);
        $("#briefDiv").show();
        $("#briefTime").show();
        $(".spacer_bar").show();
        $("#pause").show();
        $("#briefDiv").removeClass("correct_brief incorrect_brief end_brief");
        if (outcome == "expired" || outcome == "wrong") {
            incorrect++;
            $("#incorrect").text(incorrect);
            var tempValue = questions[questionCounter].correct;
            $(".answer[value=" + tempValue + "]").addClass("bg_correct");
            $(".answer[value=" + tempValue + "]").append("<span class='ml-4 small'> (Correct Answer)</span>");
            $("#briefDiv").addClass("incorrect_brief");
            delayTime = 10000;
        } else {
            correct++;
            $("#correct").text(correct);
            $("#briefDiv").addClass("correct_brief");
            delayTime = 10000;
        }
        briefTime = delayTime / 1000;
        $("#briefTime").show();
        $("#briefTime").text("Closes in: " + briefTime + " sec");
        $("#dismiss").show();
        briefInterval = setInterval(briefTimer, 1000);
        $("#time_text").hide();
        $("#brief_review").text(questions[questionCounter].explain);
        questionCounter++;
        briefTimeout(delayTime);
    }

    function runTimer() {
        // update the timer countdown every second
        curTime--;
        if (curTime <= 5) {
            $("#time_text").removeClass("text-dark").addClass("text-danger");
        } else {
            $("#time_text").removeClass("text-danger").addClass("text-dark");
        }
        $("#time_text").text("Time Remaining: " + curTime);
        if (curTime == 0) {
            clearInterval(timerInterval);
            timeEnded("expired");
        }
    }

    function newQuestion() {
        $("#briefDiv").hide();
        $("#time_text").show();
        curTime = questionTime;
        // start the countdown timer
        timerInterval = setInterval(runTimer, 1000);
        $("#time_text").removeClass("text-danger").addClass("text-dark");
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
        remaining = questionsGame;
        $("#correct").text(correct);
        $("#incorrect").text(incorrect);
        $("#remaining").text(remaining);
        clicked = false;
        gameover = false;
        $(".answer").removeClass("bg_correct bg_incorrect")
        $("#start_btn").hide(0);
        $("#attract_text").hide();
        $("#game_area").show();
        $("#question_card").show();
        questionCounter = 0;
        newQuestion();
    });

});