// HTML Elements
const holes = document.querySelectorAll('.hole');
const moles = document.querySelectorAll('.mole');
const scoreBoard = document.querySelector('.score');
const startButton = document.getElementById('startgame');
const stopButton = document.getElementById('stopgame');
const resetButton = document.getElementById('reset');

// global variables
let score = 0;
let time = 15;
let timer;
let gameOver = true;

// returns a random time interval between the max and min time you set
const randomTimeInterval = (min, max) => Math.round(Math.random() * (max - min) + min)

// returns a random index number of a hole that doesn't currently have a mole in it
const randomHole = () => {
  const index = Math.floor(Math.random() * holes.length);
  holes[index].classList.contains('up') ? randomHole() : null;
  return index;
}

// The "up" class makes the mole png appear 
const popUp = () => {
  const index = randomHole();
  holes[index].classList.add('up');

  setTimeout(() => {
    holes[index].classList.remove('up');
  }, randomTimeInterval(300, 2000))

  // recursively call itself until the game is over
  setTimeout(() => {
    gameOver ? null : popUp();
  }, randomTimeInterval(300, 1000))
}

// handles the logic for clicking on the mole. this.parentNode is the hole div
function whack(e) {
  this.parentNode.classList.remove('up');
  if (!gameOver) {
    score += 10;
    updateScore(score);
  }
}

// babel didn't compile forEach properly for ie11, so I stuck with a for loop
for(let i = 0; i < moles.length; i++) {
  moles[i].addEventListener('click', whack)
}

// Button Logic
startButton.onclick = function startGame() {
  gameOver = false;
  score = 0;
  updateScore(score);
  popUp();
  buttonDisplay('none', 'inline');

  timer = setTimeout(() => {
    gameOver = true;
    buttonDisplay('inline', 'none');
  }, time * 1000)
}

// clearTimeout stops the setTimeout from startGame()
stopButton.onclick = function stopGame() {
  gameOver = true;
  buttonDisplay('inline', 'none')
  clearTimeout(timer);
}

resetButton.onclick = function resetGame() {
  gameOver = true;
  score = 0;
  updateScore(score);
  buttonDisplay('inline', 'none')
  clearTimeout(timer);
}

const updateScore = (score) => scoreBoard.innerHTML = `SCORE: ${score}`

const buttonDisplay = (start, stop) => {
  startButton.style.display = start;
  stopButton.style.display = stop;
}