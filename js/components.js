function Shipmovements(event) {
  if (event.key === "ArrowUp") {
    event.preventDefault()
    moveUp()
  } else if (event.key === "ArrowDown") {
    event.preventDefault()
    moveDown()
  } else if (event.key === " ") {
    event.preventDefault()
    fireShoot()
  }
}
function moveUp() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "-36px") {// Limit from the top
    return
  } else {
    let position = parseInt(topPosition)
    position -= 4 // how many px moves when you touch in keyboard
    shooter.style.top = `${position}px`
  }
}
function moveDown() {
  let topPosition = window.getComputedStyle(shooter).getPropertyValue('top')
  if (shooter.style.top === "552px") { // Limit from the bottom
    return
  } else {
    let position = parseInt(topPosition)
    position += 4 // how many px moves when you touch in keyboard
    shooter.style.top = `${position}px`
  }
}

// Creating the element Laser

function fireShoot() {
    let laser = createLaserElement()
    mainPlayArea.appendChild(laser)
    let laserSFX = new Audio('audio/laser-sfx.m4a')
    laserSFX.play()
    moveLaser(laser)
  }

  function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('left'))
    let yPosition = parseInt(window.getComputedStyle(shooter).getPropertyValue('top'))
    let newLaser = document.createElement('img')
    newLaser.src = 'images/laser.png'
    newLaser.classList.add('laser')
    newLaser.style.left = `${xPosition}px`
    newLaser.style.top = `${yPosition - 30}px` // position where the laser starts
    return newLaser
  }
  
  
  function moveLaser(laser) {
    let laserInterval = setInterval(() => {
      let xPosition = parseInt(laser.style.left)
      let monsters = document.querySelectorAll(".monster")
      monsters.forEach(monster => {
        console.log(monster, laser)
        if (checkLaserCollision(laser, monster)) {
          let explosion = new Audio('audio/explosion.m4a')
          explosion.play()
          monster.src = "images/explosion.png"
          monster.classList.remove("monster")
          monster.classList.add("dead-monster")
          scoreCounter.innerText = parseInt(scoreCounter.innerText) + 100
        }
      })
      if (xPosition > 1300 ) { // when the position of the laser across 1000 px the function remove him
        laser.style.display = 'none'
        laser.remove()
        clearInterval(laserInterval)
      } else {
        laser.style.left = `${xPosition + 4}px` // Px per px when we shoot
      }
    }, 10)//Speed of the laser
  }
  function createPlanets() {
    if(document.querySelectorAll(".planet").length < 2){
    let newPlanet = document.createElement('img') // Take the planet with dom and store the image in var
    let PlanetSpriteImg = planetsImgs[Math.floor(Math.random()*planetsImgs.length)] // taking a random image on the array and store him on var
    newPlanet.src = PlanetSpriteImg
    newPlanet.classList.add('planet')
    newPlanet.classList.add('planet-transition')
    newPlanet.style.left = '1300px' /// spawn Planets
    newPlanet.style.top = `${Math.floor(Math.random() * 500) + 30}px`
    mainPlayArea.appendChild(newPlanet)
    movePlanet(newPlanet)
    }
    
  }
  function movePlanet (planet) {
    let movePlanetInterval = setInterval(() => {
      let xPosition = parseInt(window.getComputedStyle(planet).getPropertyValue('left'))
      if (xPosition <= 100) {    
          planet.remove()
        }else {
        planet.style.left = `${xPosition - 4}px`
      } 
    }, 100) // Speed of the planets
  }
  
  function createMonster() {
      let newMonster = document.createElement('img') // Take the monster with dom and store the image in var
      let monsterSpriteImg = monsterImgs[Math.floor(Math.random()*monsterImgs.length)] // taking a random image on the array and store him on var
      newMonster.src = monsterSpriteImg 
      newMonster.classList.add('monster')
      newMonster.classList.add('monster-transition')
      newMonster.style.left = '1300px' /// spawn Monsters
      newMonster.style.top = `${Math.floor(Math.random() * 500) + 30}px`
      mainPlayArea.appendChild(newMonster)
    moveMonster(newMonster)
  }
  
  function moveMonster(monster) {
    let moveMonsterInterval = setInterval(() => {
      let xPosition = parseInt(window.getComputedStyle(monster).getPropertyValue('left'))
      if (xPosition <= 100) {    /// GameOver if they across that Position
        if (Array.from(monster.classList).includes("dead-monster")) {
          monster.remove()
        } else {
          gameOver() // if the monster across the position 0 = GameOver
        }
      } else {
        monster.style.left = `${xPosition - 4}px`
      }
    }, 50) // Speed of the monsters
  }

  //collision

  function checkLaserCollision(laser, monster) {
    let laserLeft = parseInt(laser.style.left)  // X-axis and Y-axis positions of each element
    let laserTop = parseInt(laser.style.top)    // X-axis and Y-axis positions of each element
    let monsterTop = parseInt(monster.style.top)
    let monsterBottom = monsterTop - 100 
    let monsterLeft = parseInt(monster.style.left)
    if (laserLeft != 340 && laserLeft + 40 >= monsterLeft) { // when the position of the laser reachs px is removed by dom
      if ( (laserTop <= monsterTop && laserTop >= monsterBottom) ) {
        return true // returns true if the monster has been hit by a laser and it should be destroyed
      } else {
        return false
      }
    } else {
      return false
    }
  }
  
  function gameOver() {
    window.removeEventListener("keydown", Shipmovements)
    let gameOverSfx = new Audio('audio/game-over.m4a')
    gameOverSfx.play()
    clearInterval(monsterInterval)
    let monsters = document.querySelectorAll(".monster")
    monsters.forEach(monster => monster.remove())
    clearInterval(planetInterval)
    let planet = document.querySelectorAll(".planet")
    planet.forEach(planet => planet.remove())
    let lasers = document.querySelectorAll(".laser")
    lasers.forEach(laser => laser.remove())
    setTimeout(() => {
      alert(`Game Over! The monsters made it to Mars. Your final score is ${scoreCounter.innerText}!`)
      shooter.style.top = "300px"  // Get the players from the initial position
      startButton.style.display = "block"
      gameSec.classList.add("active");
  playGame();
      scoreCounter.innerText = 0  // reset the score
    }, 1100)
  }
  