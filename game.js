var buttonColours = ["red", "blue", "green", "yellow"];
var gamPattern = [];
var userClickedPattern = [];
var gameStart = false;
var level = 1;
var gameOver = false;

function nextSequence() {
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamPattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

  level++;
  console.log("gamPattern");
  console.log(gamPattern);
}


$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");

  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
  console.log("userClickedPattern");
  console.log(userClickedPattern);
});


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function animatePress(currentColour) {
  $("." + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamPattern[currentLevel]) {
    console.log("success");
  } else {
    console.log("wrong");
    gameOver = true;
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    gameStart = false;
    // gameOver = true;
    level = 1;
    gamPattern = [];
    userClickedPattern = [];
  }

  if (currentLevel === level - 2 && gameOver === false) {
    setTimeout(function() {
      userClickedPattern = [];
      nextSequence();
    }, 1000);
  }
}

$(document).keypress(function() {
  if (gameStart == false) {
    nextSequence();
    gameStart = true;
    gameOver = false;
  }
});
