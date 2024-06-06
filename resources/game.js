/* jshint esversion: 8 */

const ENEMY_SPEED = 0.2;
let time;
let diff = 0;
let pause = false; /// will pause in DOM load
var mouseX,mouseY;
var killLog;

window.addEventListener('DOMContentLoaded', function(){
	killLog = this.document.getElementById("killLog");
	time = getTime();
	pauseGame();

	let highscore = document.getElementsByTagName("main");
	if(localStorage.getItem("highscore") && highscore)
		highscore[0].innerHTML = "Highscore: " + localStorage.getItem("highscore");
	
	let timeEl = document.createElement('p');
	document.body.appendChild(timeEl);
	timeEl.innerHTML = "NO SCORE.";
	
	this.document.onmousemove = function(e) {
		mouseX = e.clientX;
		mouseY = e.clientY;
	};
	// Disable right-click context menu on specific elements
	window.addEventListener('contextmenu', (event) => {
			event.preventDefault();
	});
	// Disable mouse events
	window.addEventListener('mousemove', (event) => {
			// Prevent default mousemove behavior
			event.preventDefault();
			unpauseGame();
	});
	// Detect cursor leaving the browser window
	document.addEventListener('mouseout', (event) => {
			pauseGame();
	});
	document.addEventListener('mouseover', (event) => {
		if(!hasTouched)
			unpauseGame();
	});
	
	let enemyNames = getProfi();
	
	let enemies = [];
	spawnEnemyAtInterval(enemies,enemyNames);
	
	handleTouchScreen();	
	
	const runCollision = setInterval( () =>{
		checkEnemyCollisions(enemies);
	},100);
	
	const runGame = setInterval( () =>{
		if(pause)return;
		
		timeEl.innerHTML = "SCORE: " + getScore();
		enemies.forEach((enemy) => advanceEnemy(enemy));

	},100);
	
});



var touchDuration = 1000; // 1 second
var isTouching = false;
var hasTouched = false;
function handleTouchScreen(){
	
	document.addEventListener('touchstart', (event) => {
		 handleTouchMousePos(event);
    touchStartTime = getTime();
    isTouching = true;
		hasTouched = true;
	});

	// Handle touch end event
	document.addEventListener('touchend', (event) => {	
			isTouching = false;
			pauseGame();
	});
	
	document.addEventListener('touchmove',  handleTouchMousePos);
	
	
	
	const runTouchCheck = setInterval(() =>{
		if(!isTouching) return;
    let touchTime = getTime() - touchStartTime;
    if (touchTime > touchDuration) {
        unpauseGame();
    } else {
        pauseGame();
    }
	},100);
}
function handleTouchMousePos(event) {
    let touch = event.touches[0];
    mouseX = touch.clientX;
    mouseY = touch.clientY;
}

let intervalTime = 3000; // Start with 3 seconds
function spawnEnemyAtInterval(enemies, enemyNames){
	
	const minimumIntervalTime = 500; // Minimum time interval (e.g., 0.5 seconds)
	const decreaseRate = 100; // Decrease the interval time by 100ms each iteration

	if(!pause)
		addEnemy(enemies, enemyNames);

  // Decrease the interval time but do not go below the minimum interval time
  intervalTime = Math.max(intervalTime - decreaseRate, minimumIntervalTime);

  // Set the next enemy creation with the updated interval time
  setTimeout(() => spawnEnemyAtInterval(enemies, enemyNames), intervalTime);

}

function getScore(){
	return Math.round((getTime() - time)/100);
}
	
function getTime(){
	return new Date().getTime();
}
function pauseGame(){
	if(pause)return;
	pause = true;
	diff = getTime();
}
function unpauseGame(){
	if(!pause) return;
	time += getTime() - diff;
	/// console.log(time, getTime() - diff);
	pause = false;
	diff = 0;
}
	
function getProfi(){
	const filenames = [
  "cezara1.png",
  "cezara2.png",
  "cezara3.png",
  "cezara4.png",
  "cezaraBackground.jpg",
  "hirica1.png",
  "hirica2.png",
  "leustean1.png",
  "leustean2.png",
  "moisil.png",
  "moisil2.png",
  "paun1.png",
  "paun2.png",
  "paun3.png",
  "rusu1.png",
  "rusu2.png",
  "rusu3.png",
  "ruxi.png",
  "sfetcu.png",
  "sipos1.png",
  "sipos2.png",
  "tiran1.png",
  "tiran2.png"
];
filenames.forEach((e,i,v) =>{
	v[i] = '/enemies/' + v[i];
});
	return filenames;
}
function addEnemy(enemies, enemyNames){
	
	let chosenEnemy = getRandomElement(enemyNames);
	///let img = document.getElementById("enemy" + enemies.length);
	let	img = document.createElement("img");
	img.src = chosenEnemy;
	img.id = "enemy" + enemies.length;
	img.style.maxWidth = "15vmin";
	img.style.maxHeight = "20vmin";
	img.style.position = "absolute";
	
	 img.addEventListener('mouseover', handleEnemyHover);	
	
	enemies.push(img);
	document.body.appendChild(img);
	spawnEnemy(img);
}

 function handleEnemyHover(event) {
		event.target.style.backgroundColor = 'red'; // Change color on hover
		setTimeout(() => {
			
			localStorage.setItem('highscore',Math.max(localStorage.getItem('highscore'), getScore()));
			
			sendPost('/gameOver',[]);
			deleteEnemy(event.target);
		}, 100);
		/// console.log('Collision detected with', event.target);
}


function deleteEnemy(enemy){
	enemy.remove();
}

function spawnEnemy(enemy){
	let width = +window.getComputedStyle(enemy).getPropertyValue("max-width").slice(0,-2); /// slice removes px.
	let height = +window.getComputedStyle(enemy).getPropertyValue("max-height").slice(0,-2);
	let {x,y} = getCoords(width, height);
	
	
	enemy.style.left = `${x}px`;
  enemy.style.top =  `${y}px`;
	
}

function getCoords(enemyWidth,enemyHeight){
	const sides = [ 'right','top', 'bottom', 'left'];
  
  // Randomly select a side
  const selectedSide = sides[getRandomInt(0,3)];
	
	let x, y;
	let screenWidth = screen.width;
	let screenHeight = screen.height;
	

  // Determine spawn coordinates based on the selected side
  switch (selectedSide) {
    case 'top':
      x = getRandomInt(0, screenWidth);
      y = -enemyHeight; // Spawn just above the screen
      break;
    case 'bottom':
      x = getRandomInt(0, screenWidth);
      y = screenHeight; // Spawn just below the screen
      break;
    case 'left':
      x = -enemyWidth; // Spawn just left of the screen
      y = getRandomInt(0, screenHeight);
      break;
    case 'right':
      x = screenWidth; // Spawn just right of the screen
      y = getRandomInt(0, screenHeight);
      break;
  }

  return { x, y };
	
}

function advanceEnemy(enemy){
	let width = +window.getComputedStyle(enemy).getPropertyValue("max-width").slice(0,-2); /// slice removes px.
	let height = +window.getComputedStyle(enemy).getPropertyValue("max-height").slice(0,-2);
	let XTopLeft = +window.getComputedStyle(enemy).getPropertyValue("left").slice(0,-2);
	let YTopLeft = +window.getComputedStyle(enemy).getPropertyValue("top").slice(0,-2);
	
	let [x ,y ] = advanceTowardsMouse (XTopLeft + width/2,YTopLeft + height/2);
	
	enemy.style.left = `${x - width/2}px`;
  enemy.style.top =  `${y - height/2}px`;
	
	return {x,y};
}
	

function advanceTowardsMouse(x, y, stepSize = 10) {

  // Calculate the difference between the current position and the center
  const deltaX = mouseX - x;
  const deltaY = mouseY - y;

  // Update the position
  const newX = x + deltaX * ENEMY_SPEED;
  const newY = y + deltaY * ENEMY_SPEED;

  return [newX, newY];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(vector){
	return vector[getRandomInt(0,vector.length-1)];
}
async function sendPost(path,data){
	try {
      const response = await fetch(path, {
				
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (response.ok) {
				console.log("ok");
        // Redirect to loggedin.html if the request is successful
        window.location.href = path;
				return "";
      } else {
        // Handle error responses
        const data = await response.json();
				return data.message;
      }
    } catch (error) {
      console.error('Error:', error);
			return "FETCHING ERROR!";
    }
}

function parseImage(path){
	var regex = /\/enemies\/([a-zA-Z]+)\d*\.(\w+)/g;
	return regex.exec(path)[1];
}
function revertTransition() {
    // Remove transition
		killLog.style.transition = "";
    // Remove transformation
    killLog.style.transform = "";
}
function updateKillLog(enemy1,enemy2){
	killLog.innerHTML = parseImage(enemy1.src) + " KILLED " + parseImage(enemy2.src) ;
	killLog.style.transition = "transform 1s";
	killLog.style.transform = " scale(1.8)";
	
	// Add event listener to listen for transition end
	killLog.addEventListener("transitionend", revertTransition);
}


function getBoundingBox(element) {
		const rect = element.getBoundingClientRect();
		return {
				x: rect.left,
				y: rect.top,
				width: rect.width,
				height: rect.height,
		};
}

function isColliding(box1, box2) {
		return !(
				box1.x > box2.x + box2.width ||
				box1.x + box1.width < box2.x ||
				box1.y > box2.y + box2.height ||
				box1.y + box1.height < box2.y
		);
}

function checkEnemyCollisions(enemies) {
		for (let i = 0; i < enemies.length; i++) {
				for (let j = i + 1; j < enemies.length; j++) {
						const enemy1 = enemies[i];
						const enemy2 = enemies[j];
						const box1 = getBoundingBox(enemy1);
						const box2 = getBoundingBox(enemy2);
						if (isColliding(box1, box2)) {
								/// console.log('Collision detected between enemies', i, 'and', j);
								
								deleteEnemy(enemy1);
								deleteEnemy(enemy2);
								enemies.splice(j,1);
								enemies.splice(i,1);
								
								updateKillLog(enemy1,enemy2);
								
						}
				}
		}
}