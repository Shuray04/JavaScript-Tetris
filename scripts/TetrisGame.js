const GAME_CANVAS = document.getElementById('game-canvas');
const GAME_CONTEXT = GAME_CANVAS.getContext('2d');

const CANVAS_PIXELS_WIDTH = 750;
const CANVAS_PIXELS_HEIGHT = 1500;
const CANVAS_RATIO = CANVAS_PIXELS_HEIGHT / CANVAS_PIXELS_WIDTH;

const FIELD_LENGTH = 9;
const FIELD_HEIGHT = 19;

const BLOCK_SIZE = 75;

const PIECES = []
var currentPiece = null;

var gravityDelay = 70;
var moveDelay = 4;
var rotationDelay = 10;

var gravityTimer = 0;
var moveTimer = 0;
var rotationTimer = 0;

function onGameResize()
{
    if (GAME_CANVAS.width > GAME_CANVAS.height){
        GAME_CANVAS.width = GAME_CANVAS.height*(1/CANVAS_RATIO);
    }
    else{
        GAME_CANVAS.height = GAME_CANVAS.width*CANVAS_RATIO;
    }
}
window.addEventListener("resize", onGameResize);


function updateGame(){
    if (currentPiece == null){
        currentPiece = new Piece(Math.floor(Math.random() * 7));
        PIECES.push(currentPiece);
    }
    if (isKeyPressed('ArrowRight') && moveTimer > moveDelay){
        currentPiece.moveRight();
        moveTimer = 0;
    }
    if (isKeyPressed('ArrowLeft') && moveTimer > moveDelay){
        currentPiece.moveLeft();
        moveTimer = 0;
    }
    if (isKeyPressed('ArrowDown') && moveTimer > moveDelay/2){
        currentPiece.moveDown();
        moveTimer = 0;
    }
    if (isKeyPressed('ArrowUp') && rotationTimer > rotationDelay){
        currentPiece.rotate();
        rotationTimer = 0;
    }

    if (gravityTimer > gravityDelay){
        if (!currentPiece.moveDown()){
            currentPiece = null;
        }
        gravityTimer = 0;
    }
    moveTimer++;
    gravityTimer++;
    rotationTimer++;
}

function renderGame(){
    GAME_CONTEXT.clearRect(0, 0, CANVAS_PIXELS_WIDTH, CANVAS_PIXELS_HEIGHT);
    PIECES.forEach(function(piece){
        GAME_CONTEXT.fillStyle = piece.color;
        piece.blocks.forEach(function(block){
            GAME_CONTEXT.fillRect(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
        });
    });
}