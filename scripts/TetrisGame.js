const GAME_DIV = document.getElementById('game-div');
const GAME_CONTEXT = document.getElementById('game-canvas').getContext('2d');
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
var removeLineCounter = 0; //93 Frames per removed line

var renderGame = false;

var removeAnimation = false;
var field = [];
var removableLines = [];
var blink = false;

var bag = createBag();
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
    return newBag;
}

function onGameResize(){
    
}
window.addEventListener("resize", onGameResize);


function updateTetris(){
    if (removeAnimation){
        removeLineCounter++;
        if (removeLineCounter >= 93){
            removeLineCounter = 0;
            renderGame = true;
            removeAnimation = false;
            removableLines.forEach(function(line){
                line.forEach(function(item){ item.piece.blocks.splice(item.piece.blocks.indexOf(item.block), 1); });
                pieces.forEach(function(piece){
                    piece.blocks.forEach(function(block){
                        if (block.y < field.indexOf(line)){
                            block.y++;
                        }
                    });
                });
            });
        }
        return;
    }

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
            field = [];
            for (var i = 0; i <= FIELD_HEIGHT; i++){ field.push([]); }
            pieces.forEach(function(piece){
                piece.blocks.forEach(function(block){
                    if (block.y >= 0){ field[block.y].push({piece: piece, block: block}); }
                });
            });
            field.forEach(function(line){
                if (line.length > FIELD_LENGTH){
                    removeAnimation = true;
                    removableLines.push(line);
                }
            });

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
    if (removeAnimation){
        if (removeLineCounter % 10 == 0){ blink = !blink; }
        if (blink){
            removableLines.forEach(function(line){
                line.forEach(function(item){
                    GAME_CONTEXT.fillStyle = "#C3CFA1";
                    GAME_CONTEXT.fillRect(item.block.x * BLOCK_SIZE, item.block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);   
                });
            });
        }else{
            removableLines.forEach(function(line){
                line.forEach(function(item){
                    GAME_CONTEXT.drawImage(images[item.piece.type], item.block.x * BLOCK_SIZE, item.block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
                });
            });
        }
    }
}