const GAME_DIV = document.getElementById('game-div');
const GAME_CANVAS = document.getElementById('game-canvas');
const GAME_CONTEXT = GAME_CANVAS.getContext('2d');
const GAME_SCORE = document.getElementById('score');
const GAME_LEVEL = document.getElementById('level');
const GAME_LINES = document.getElementById('lines');

const CANVAS_PIXELS_WIDTH = 750;
const CANVAS_PIXELS_HEIGHT = 1350;
const CANVAS_RATIO = CANVAS_PIXELS_HEIGHT / CANVAS_PIXELS_WIDTH;
const GAMEBOY_RATIO = 160/144;

const FIELD_LENGTH = 9;
const FIELD_HEIGHT = 17;
const BLOCK_SIZE = 75;
var pieces = [];
var currentPiece = null;

var gravityDelay = 20;
var moveDelay = 4;
var rotationDelay = 10;

var gravityTimer = 0;
var moveTimer = 0;
var rotationTimer = 0;
var renderGame = false;

var bag = createBag();
var nextPiece;
function createBag(){
    var newBag = [Math.floor(Math.random() * 7)];
    for (var i = 0; i < 6; i++){
        var isNew = false;
        var newItem = 0;
        while (!isNew){
            newItem = Math.floor(Math.random() * 7);
            for (var item in newBag){
                if (newItem == newBag[item]){
                    isNew = false;
                    break;
                }else{
                    isNew = true;
                }
            }
        }
        newBag.push(newItem);
    }
    console.log(newBag);
    return newBag;
}

function onGameResize()
{
    /*if (GAME_CANVAS.width > GAME_CANVAS.height){
        GAME_CANVAS.width = GAME_CANVAS.height*(1/CANVAS_RATIO);
    }
    else{
        GAME_CANVAS.height = GAME_CANVAS.width*CANVAS_RATIO;
    }*/
}
window.addEventListener("resize", onGameResize);


function updateTetris(){
    //Handle playerinput + gravity
    if (currentPiece == null){
        if (bag.length == 0){
            bag = createBag();
        }
        currentPiece = new Piece(bag[0]);
        bag.splice(0, 1);
        pieces.push(currentPiece);
        renderGame = true;
    }
    if (isKeyPressed('ArrowRight') && moveTimer > moveDelay){
        currentPiece.moveRight();
        moveTimer = 0;
    }
    if (isKeyPressed('ArrowLeft') && moveTimer > moveDelay){
        currentPiece.moveLeft();
        moveTimer = 0;
    }
    if (isKeyPressed('ArrowDown')){
        currentPiece.moveDown();
    }
    if (isKeyPressed('ArrowUp') && rotationTimer > rotationDelay){
        currentPiece.rotate();
        rotationTimer = 0;
    }
    if (gravityTimer > gravityDelay){
        if (!currentPiece.moveDown()){
            currentPiece.blocks.forEach(function(block){
                if (block.y == 1){
                    pieces = [];
                    return;
                }
            });
            currentPiece = null;
            //check if a line is completed
            var field = [];
            for (var i = 0; i <= FIELD_HEIGHT; i++){ field.push([]); }
            pieces.forEach(function(piece){
                piece.blocks.forEach(function(block){
                    if (block.y >= 0){ field[block.y].push({piece: piece, block: block}); }
                });
            });

            var removedLines = [];
            field.forEach(function(line){
                if (line.length > FIELD_LENGTH){
                    line.forEach(function(item){
                        item.piece.blocks.splice(item.piece.blocks.indexOf(item.block), 1);
                    });
                    pieces.forEach(function(piece){
                        piece.blocks.forEach(function(block){
                            if (block.y < field.indexOf(line)){
                                block.y++;
                            }
                        });
                    });
                }
            });

            //Check if a Piece can be completly removed
            pieces.forEach(function(piece){
                if (piece.blocks.length == 0){
                    pieces.splice(pieces.indexOf(piece), 1);
                }
            });
        }
        gravityTimer = 0;
    }
    moveTimer++;
    gravityTimer++;
    rotationTimer++;
}

function renderTetris(){
    if (renderGame){
        GAME_CONTEXT.clearRect(0, 0, CANVAS_PIXELS_WIDTH, CANVAS_PIXELS_HEIGHT);
        pieces.forEach(function(piece){
            piece.blocks.forEach(function(block){
                GAME_CONTEXT.drawImage(images[piece.type], block.x * BLOCK_SIZE, block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                //GAME_CONTEXT.putImageData(images[piece.type], block.x * BLOCK_SIZE, block.y * BLOCK_SIZE);
            });
        });
        renderGame = false;
    }
}