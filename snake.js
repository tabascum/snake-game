let blockSize = 25;
let rows = 20;
let cols = 20;
let board;
let context;

//snake heard

let snakeX = blockSize * 5;
let snakeY = blockSize * 5;

let snakeBody = [];

//food

let foodX;
let foodY;

let velX = 0;
let velY = 0;

let gameOver = false;

window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //this is used to draw on the board
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    //update();
    setInterval(update, 1000/10);
}

function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "darkblue";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY])
        placeFood();
    }

    for (let i = snakeBody.length-1; i > 0; i--) {
        snakeBody[i] = snakeBody[i-1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velX * blockSize;
    snakeY += velY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    //game over conditions

    if (snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 || snakeY > rows*blockSize) {
        gameOver = true;
        alert("Game Over!");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            gameOver = true;
            alert("Game Over!")
        }
    }
}

function changeDirection(e) {
    if (e.code == "ArrowUp" && velY != 1) {
        velX = 0;
        velY = -1;
    } 
    else if (e.code == "ArrowDown" && velY != -1) {
        velX = 0;
        velY = 1;
    }
    else if (e.code == "ArrowLeft" && velX != 1) {
        velX = -1;
        velY = 0;
    }
    else if (e.code == "ArrowRight" && velX != -1) {
        velX = 1;
        velY = 0;
    }
}

function placeFood () {
    //math.random returns a number between 0 and 1
    //math.floor gets rid of decimal places
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}