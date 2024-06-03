window.addEventListener('DOMContentLoaded', function(){
	
	let enemyNames = getProfi();
	
	let enemies = [];
	const createEnemy = setInterval( () =>{
		addEnemy(enemies,enemyNames);
	},1000);
	
	addEnemy(enemies,enemyNames);
	deleteEnemy(enemies,"enemy-1");
	
	const runGame = setInterval( () =>{
		enemies.forEach((enemy) => advanceEnemy(enemy));
	},500);
	
});

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
	v[i] = '/images/' + v[i];
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
	enemies.push(img);
	document.body.appendChild(img);
	
	spawnEnemy(img);
	
	
	
	
}

function deleteEnemy(enemies, enemy = "enemy0"){
	
	if(enemies.length == 0)
		return;
	
	let i  = +enemy.slice(5);
	if(i >= enemies.length || i < 0)
		return;
	
	enemies[i].remove();
}

function spawnEnemy(enemy){
	let width = +window.getComputedStyle(enemy).getPropertyValue("max-width").slice(0,-2);
	let height = +window.getComputedStyle(enemy).getPropertyValue("max-height").slice(0,-2);
	
	let {x,y} = getCoords(width, height);
	
	enemy.style.left = `${x}px`;
  enemy.style.top =  `${y}px`;
	
	console.log(x, y);
	
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
	
	let width = +window.getComputedStyle(enemy).getPropertyValue("left").slice(0,-2);
	let height = +window.getComputedStyle(enemy).getPropertyValue("top").slice(0,-2);
	
	let [x,y] = advanceTowardsCenter (width,height);
	
	enemy.style.left = `${x}px`;
  enemy.style.top =  `${y}px`;
	
	return {x,y};
}
	

function advanceTowardsCenter(x, y, stepSize = 10) {
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  // Calculate the difference between the current position and the center
  const deltaX = centerX - x;
  const deltaY = centerY - y;

  // Determine the step sizes in both directions
  const stepX = Math.abs(deltaX) * .05 * Math.sign(deltaX);
  const stepY = Math.abs(deltaY) * .05 * Math.sign(deltaY);

  // Update the position
  const newX = x + stepX;
  const newY = y + stepY;

  return [newX, newY];
}

function getRandomInt(min = 0, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomElement(vector){
	return vector[getRandomInt(0,vector.length-1)];
}