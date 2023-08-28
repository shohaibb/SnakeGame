
const gameboard = document.querySelector(".game-board") ; //connects the css and js file
const scoreElement = document.querySelector(".score") ; //connects the css and js file
const highScoreElement = document.querySelector(".high-score") ; //connects the css and js file


let foodX, foodY; //creates the x and y values for the food 
let snakeX = 5, snakeY=10;  //creates the x and y for the snakes head
let velocityX = 0, velocityY = 0; //starting velocities for the snake head
let body = [];
let gameOver = false;
let setIntervalId;
let score = 0; 
let highScore = localStorage.getItem("high-score") || 0; //gets the high score from the local storage
highScoreElement.innerText = `High Score: ${highScore}`;



const foodPosition = () => {
    foodX = Math.floor(Math.random() * 30) +1; //makes a random value for the food to spawn at X
    foodY = Math.floor(Math.random() * 30) +1; //makes a random value for the food to spawn at Y
}

const handleGameOver = () => { //reloads game when you lose
    clearInterval(setIntervalId);
    alert("Dang! Game Over.")
    location.reload();

}

const changeDirection =  (e) => {
    if(e.key === "ArrowUp" && velocityY != 1) { //if up arrow clicked, velocoity of Y is upwards
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.key === "ArrowDown" && velocityY != -1){//if down arrow clicked, velocoity of Y is downwards
        velocityX = 0;
        velocityY = 1;

    }
    else if(e.key === "ArrowLeft" && velocityX != 1){//if left arrow clicked, velocoity of X goes left
        velocityX = -1;
        velocityY = 0;

    }
    else if(e.key === "ArrowRight" && velocityX != -1){//if right arrow clicked, velocoity of X goes right
        velocityX = 1;
        velocityY = 0;

    }
    initGAME();
}



const initGAME = ()=>{
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;  //connects the foods X and Y value to the grid

    if(gameOver) {
        return handleGameOver();
    }
    if(snakeX === foodX && snakeY === foodY){
        foodPosition();
        body.push([foodX,foodY]);
        console.log(body);
        score++; //adds 1 when you eat the food


        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;



    }

    for (let i = body.length-1; i >0; i--) { //adds a piece to the snake
        body[i] = body[i-1];    
    }

    body[0] = [snakeX, snakeY];

    //updates the snakes position depending on the velocity
    snakeX += velocityX;
    snakeY += velocityY;

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30 ){
        gameOver = true;
    }

    for (let i = 0; i < body.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${body[i][1]} / ${body[i][0]}"></div>`;  //adds a body part every time the snake goes nom nom

        if(i !== 0 && body[0][1] === body[i][1] && body[0][0] === body[i][0]){//if the snake eats itself the game ends
            gameOver = true;

        }
        
    }


    gameboard.innerHTML = htmlMarkup;
}




foodPosition();
setIntervalId = setInterval(initGAME, 125);
document.addEventListener("keydown", changeDirection);
