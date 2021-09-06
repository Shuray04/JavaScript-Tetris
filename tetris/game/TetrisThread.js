const TetrisGame = require('./TetrisGame.js');
const InputHandler = require('./InputHandler.js');
const { parentPort } = require('worker_threads');

var game = new TetrisGame();
var input = new InputHandler();
var running = false;

function updateGame(){
    if (running){
        game.update(input.input);
        if (game.renderGame){
            data = {
                running: running,
                currentPiece: game.currentPiece,
                amountOfPieces: game.pieces.length,
                removeLineCounter: game.removeLineCounter,
                removableLines: game.removableLines,
                resetBlocks: game.currentPiece == null ? false : game.pieces 
            }
            parentPort.postMessage(data);
        }
    }else{
        if (input.any){
            running = true;
        }
    }

}

var loop = setInterval(updateGame, 17);