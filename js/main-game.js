const startButton = document.getElementById("start-button")
const instructions = document.getElementById("instructions-text")
const mainPlayArea = document.getElementById("main-play-area")
const shooter = document.getElementById("player-controlled-shooter")
const monsterImgs = ['images/monster-1.png', 'images/monster-2.png', 'images/monster-3.png']
const planetsImgs = ['images/planet-2.png', 'images/planet-3.png','images/planet-4.png','images/planet-5.png']
const scoreCounter = document.querySelector('#score span')
const gameIntro = document.querySelector('#game-intro');
const gameSec = document.querySelector('#main-play-area');
let monsterInterval
let planetInterval

startButton.addEventListener("click", (event) => {
  playGame();

  gameIntro.classList.add("inactive");
  gameSec.classList.add("active");
  playGame();
});

function playGame() {
  startButton.style.display = 'none'
  instructions.style.display = 'none'
  window.addEventListener("keydown", Shipmovements)
  monsterInterval = setInterval(() => { createMonster() }, 2100)
  planetInterval = setInterval(() => { createPlanets() }, 4100)
}
