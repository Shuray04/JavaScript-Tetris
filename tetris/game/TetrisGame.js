const Piece = require('./Piece.js');

const FIELD_HEIGHT = 17;
const FIELD_LENGTH = 9;

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

class TetrisGame{
    constructor(){
        this.pieces = [];
        this.currentPiece = null;

        this.gravityDelay = 20;
        this.moveDelay = 4;
        this.rotationDelay = 10;

        this.gravityTimer = 0;
        this.moveTimer = 0;
        this.rotationTimer = 0;
        this.removeLineCounter = 0; //93 Frames per removed line

        this.renderGame = false;
        //this.gameStarted = false;

        this.removeAnimation = false;
        this.field = [];
        this.removableLines = [];
        this.blink = false;
        this.bag = createBag();
    }

    update(input){
        //Updates the remove Animation if a piece is removed
        if (this.removeAnimation){
            this.removeLineCounter++;
            if (this.removeLineCounter >= 93){
                this.removableLines.forEach(function(line){
                    line.forEach(function(item){ item.piece.blocks.splice(item.piece.blocks.indexOf(item.block), 1); });
                    this.pieces.forEach(function(piece){
                        piece.blocks.forEach(function(block){
                            if (block.y < this.field.indexOf(line)) block.y++;
                        });
                    });
                });
                this.removableLines = [];
                this.removeLineCounter = 0;
                this.renderGame = true;
                this.removeAnimation = false;
            }
            return;
        }
    
        //Checks if a new piece has to be spawned
        if (this.currentPiece == null){
            if (this.bag.length == 0){
                this.bag = createBag();
            }
            this.currentPiece = new Piece(this.bag[0]);
            this.bag.splice(0, 1);
            this.pieces.push(this.currentPiece);
            this.renderGame = true;
        }
    
        //player input handling
        if (input.right && this.moveTimer > this.moveDelay){
            this.currentPiece.moveRight(this.pieces);
            this.moveTimer = 0;
        }
        if (input.left && this.moveTimer > this.moveDelay){
            this.currentPiece.moveLeft(this.pieces);
            this.moveTimer = 0;
        }
        if (input.down){
            this.currentPiece.moveDown(this.pieces);
        }
        if (input.up && this.rotationTimer > this.rotationDelay){
            this.currentPiece.rotate(this.pieces);
            this.rotationTimer = 0;
        }
    
        //applying gravity
        if (this.gravityTimer > this.gravityDelay){
            if (!this.currentPiece.moveDown(this.pieces)){
                console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
                this.currentPiece.blocks.forEach(function(block){
                    if (block.y == 1){
                        this.pieces = [];
                        return;
                    }
                });
                this.currentPiece = null;
                this.field = [];
                for (var i = 0; i <= FIELD_HEIGHT; i++) this.field.push([]);
                this.pieces.forEach(function(piece){
                    piece.blocks.forEach(function(block){
                        if (block.y >= 0) this.field[block.y].push({piece: piece, block: block}); 
                    });
                });
                this.field.forEach(function(line){
                    if (line.length > FIELD_LENGTH){
                        this.removeAnimation = true;
                        this.removableLines.push(line);
                    }
                });
    
                this.pieces.forEach(function(piece){
                    if (piece.blocks.length == 0){
                        this.pieces.splice(this.pieces.indexOf(piece), 1);
                    }
                });
            }
            this.gravityTimer = 0;
        }
        this.moveTimer++;
        this.gravityTimer++;
        this.rotationTimer++;
    }
}

module.exports = TetrisGame;