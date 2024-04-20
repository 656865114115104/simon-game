alert("Welcome to Simon Game! Here are the rules:\n\n1. Simon will play a sequence of tones and colors, starting with one.\n\n2. Repeat the sequence by clicking on the colored buttons in the same order.\n\n3. If you succeed, Simon will add another tone and color to the sequence.\n\n4. Continue to follow the sequence for as long as you can.\n\n5. If you make a mistake, the game will end.\n\nEnjoy the challenge and have fun playing Simon Game!");

var buttonColours = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var level = 0;
var started = false;
$("body").keypress(function(){
    if(!started){
    
    $("#level-title").text("Level" + " "+level);
    nextSequence();
    started = true;
    }
    
    

});

$(".btn").on("click",function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);

});
function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}
    


    


function playSound(name){

        var audio = new Audio("sounds/"+ name + ".mp3");
      audio.play();
    

}
function animatePress(currentColour){
    $("#"+ currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+ currentColour).removeClass("pressed");
        

    },100);

}


function nextSequence()
{
    
    userClickedPattern=[];
    level = level+1;
    $("#level-title").text("Level " + level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);


}

function startOver(){
    level = 0;
    gamePattern=[];
    started=false;
}
