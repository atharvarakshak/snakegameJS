let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let speed = 4;
let score=0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 6, y: 5 };

//Game functions
function main(ctime) {
  window.requestAnimationFrame(main);

  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself 
  for (let i = 1; i < snakeArr.length; i++) {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
          return true;
      }
  }
  // If you bump into the wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
      return true;
  }
      
  return false;
}   



function gameEngine() {

  //1 snake array updation
  if(isCollide(snakeArr)){
    gameOverSound.play();
    // musicSound.play();
    inputDir =  {x: 0, y: 0}; 
    alert("Game Over. Press any key to play again!");
    snakeArr = [{x: 13, y: 15}];
    
    score = 0; 
  }
  // if snake eats food then increment the snake and place food at random
  if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    // musicSound.pause();
    foodSound.play();
    score += 1;
    if(score > highscoreval){
      highscoreval = score
      localStorage.setItem("Highscore",JSON.stringify(highscoreval))
      highscoreBox.innerHTML = 'Highscore : '+highscoreval;
    }
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({x:snakeArr[0].x + inputDir.x ,y:snakeArr[0].y + inputDir.y});
    let a= 2;
    let b= 16;
    food={x:Math.round(a+(b-a)*Math.random()),y:Math.round(a+(b-a)*Math.random())}
  }


  ///moving the snake by inserting each segment on next segment
  // Moving the snake
  for (let i = snakeArr.length - 2; i>=0; i--)
   { 
    snakeArr[i+1] = {...snakeArr[i]};   //destructuring for improving refrencing  - to create new object of seg every time
  }
  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;


  // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);



}

//we use game loop to paint/print screen again and again

let highscore = localStorage.getItem("highscore");
if(highscore == null){
  highscoreval=0
  localStorage.setItem("highscore",JSON.stringify(highscoreval))
}
else{
  highscoreval = JSON.parse(highscore)
  highscoreBox.innerHTML = 'highscore'+highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    // moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});
