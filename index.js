var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(".container").hide();

$(document).click(function() {
  if (!started) {
    $(".container").fadeIn(200);
    setTimeout(function() {
      nextSequence();
      started = true;
    }, 400);
  }
});

function nextSequence() {
  var x = 0;
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  gamePattern.forEach(function(color, i) {
  setTimeout(function() {
    $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
  }, x = i * 700);
  });
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  setTimeout(function() {
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
  }, x + 700);
}

  $(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 700);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Anywhere On The Screen To Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    setTimeout(function() {
      $(".container").fadeOut(200);
    }, 400);
    setTimeout(function() {
      startOver();
    }, 1000);
  }
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio(name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
