"use strict";

// HTML Elements
var holes = document.querySelectorAll('.hole');
var moles = document.querySelectorAll('.mole');
var scoreBoard = document.querySelector('.score');
var startButton = document.getElementById('startgame');
var stopButton = document.getElementById('stopgame');
var resetButton = document.getElementById('reset'); // global variables

var score = 0;
var time = 15;
var timer;
var gameOver = true; // returns a random time interval between the max and min time you set

var randomTimeInterval = function randomTimeInterval(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}; // returns a random index number of a hole that doesn't currently have a mole in it


var randomHole = function randomHole() {
  var index = Math.floor(Math.random() * holes.length);
  holes[index].classList.contains('up') ? randomHole() : null;
  return index;
}; // The "up" class makes the mole png appear 


var popUp = function popUp() {
  var index = randomHole();
  holes[index].classList.add('up');
  setTimeout(function () {
    holes[index].classList.remove('up');
  }, randomTimeInterval(300, 2000)); // recursively call itself until the game is over

  setTimeout(function () {
    gameOver ? null : popUp();
  }, randomTimeInterval(300, 1000));
}; // handles the logic for clicking on the mole. this.parentNode is the hole div


function whack(e) {
  this.parentNode.classList.remove('up');

  if (!gameOver) {
    score += 10;
    updateScore(score);
  }
} // babel didn't compile forEach properly for ie11, so I stuck with a for loop


for (var i = 0; i < moles.length; i++) {
  moles[i].addEventListener('click', whack);
} // Button Logic


startButton.onclick = function startGame() {
  gameOver = false;
  score = 0;
  updateScore(score);
  popUp();
  buttonDisplay('none', 'inline');
  timer = setTimeout(function () {
    gameOver = true;
    buttonDisplay('inline', 'none');
  }, time * 1000);
}; // clearTimeout stops the setTimeout from startGame()


stopButton.onclick = function stopGame() {
  gameOver = true;
  buttonDisplay('inline', 'none');
  clearTimeout(timer);
};

resetButton.onclick = function resetGame() {
  gameOver = true;
  score = 0;
  updateScore(score);
  buttonDisplay('inline', 'none');
  clearTimeout(timer);
};

var updateScore = function updateScore(score) {
  return scoreBoard.innerHTML = "SCORE: ".concat(score);
};

var buttonDisplay = function buttonDisplay(start, stop) {
  startButton.style.display = start;
  stopButton.style.display = stop;
};