const gameBoard= document.querySelector("#gameBoard");
let context= gameBoard.getContext("2d");
const scoreText= document.querySelector("#scoreText");
const resetBtn= document.querySelector("#resetBtn");
const gameWidth= gameBoard.width;

const gameHeight= gameBoard.height;
const boardBackground= "lightblue";
const snakeColor="Green";
const snakeBorder="black";
const snackColor= "red";
const unitSize=25;
let running= false;
let xVelocity= unitSize;
let yvelocity=0;
let snackX = 0;
let snackY= 0;
let score=0;
let snake=[
    {x:unitSize*4,y:0},
    {x:unitSize*3,y:0},
    {x:unitSize*2,y:0},
    {x:unitSize,y:0},
    {x:0,y:0}
]

window.addEventListener("keydown", changeDirection);
// resetBtn.addEventListener("click", resetGame);
gameStart();



 
function gameStart(){
    running=true;
    scoreText.textContent= score;
    createSnack();
    drawSnack();
    nextTick();

}
function nextTick(){
    if(running){
        setTimeout(()=>{
            clearBoard();
            drawSnack();
            moveSnake();
            drawSnake();
            checkGameOver();
            nextTick();
        }, 50);
    }
    else{
        displayGameOver();
    }
};
function clearBoard(){
     context.fillStyle= boardBackground;
     context.fillRect(0,0,gameWidth,gameHeight);
};
function createSnack(){
    function randomSnack(min, max){
        const randNum = Math.round((Math.random()*(max-min)+min)/unitSize)*unitSize;
        return randNum;
    }
    snackX=randomSnack(0,gameWidth-unitSize);
    snackY=randomSnack(0, gameHeight-unitSize);
    console.log(snackX);
};
function drawSnack(){
    context.fillStyle=snackColor;
    context.fillRect(snackX,snackY, unitSize,unitSize);

};
function moveSnake(){
    const head = {x: snake[0].x
+xVelocity, 
y: snake[0].y + yvelocity };
snake.unshift(head);
if(snake[0].x== snackX && snake[0].y==snackY){
    score+=1;
    scoreText.textContent=score;
    createSnack();
}
else{
    snake.pop();
}
};
function drawSnake(){
    context.fillStyle= snakeColor;
    context.strokeStyle= snakeBorder;
    snake.forEach(snakePart=>{
        context.fillRect(snakePart.x, snakePart.y, unitSize, unitSize);
        context.strokeRect(snakePart.x, snakePart.y, unitSize, unitSize);
    })

};
function changeDirection(event){
    const keyPressed= event.keyCode;
    
    const LEFT = 37;
    const UP =38;
    const RIGHT = 39;
    const DOWN =40;

    const goingUp=(yvelocity== -unitSize);
    const goingDown=(yvelocity== unitSize);
    const goingRight=(xVelocity== unitSize);
    const goingLeft=(xVelocity== -unitSize);

    switch(true){
        case(keyPressed==LEFT && !goingRight):
            xVelocity=-unitSize;
            yvelocity=0;
            break;
        case(keyPressed==UP && !goingDown):
            xVelocity=0;
            yvelocity=-unitSize;
            break;
        case(keyPressed==RIGHT && !goingLeft):
            xVelocity=unitSize;
            yvelocity=0;
            break;
        case(keyPressed==DOWN && !goingUp):
            xVelocity=0;
            yvelocity=unitSize;
            break;

    }                                                                         
                              
};

function checkGameOver(){

};