const GAME_CONTEXT = document.getElementById('game-canvas').getContext('2d');
GAME_CONTEXT.imageSmoothingEnabled = false;
const GAME_SCORE = document.getElementById('score');
const GAME_LEVEL = document.getElementById('level');
const GAME_LINES = document.getElementById('lines');

const CANVAS_PIXELS_WIDTH = 750;
const CANVAS_PIXELS_HEIGHT = 1350;
const REMOVE_ANIMATION_FRAMES = 93;

const FIELD_LENGTH = 9;
const FIELD_HEIGHT = 17;
const BLOCK_SIZE = 8;


class TetrisGame {
    constructor() {
        this.pieces = [];
        this.currentPiece = null;
        
        this.gravityDelay = 56;
        this.moveDelay = 4;
        this.rotationDelay = 10;
        
        this.gravityTimer = 0;
        this.moveTimer = 0;
        this.rotationTimer = 0;
        this.removeLineCounter = 0;
        
        this.renderGame = false;
        this.removeAnimation = false;
        this.field = [];
        this.removableLines = [];
        this.blink = false;
        
        this.level = 0;
        this.score = 0;
        this.totalLines = 0;
        
        this.bag = [0, 1, 2, 3, 4, ,5 ,6].sort((a, b) => 0.5 - Math.random());
    }


    update() {
        //Updates the remove Animation if a piece is removed
        if (this.removeAnimation) {
            this.removeLineCounter++;
            if (this.removeLineCounter >= REMOVE_ANIMATION_FRAMES) {
                for (let line of this.removableLines) {
                    for (let item of line) { 
                        item.piece.blocks.splice(item.piece.blocks.indexOf(item.block), 1); 
                    }
                    for (let piece of this.pieces) {
                        for (let block of piece.blocks) {
                            if (block.y < this.field.indexOf(line)) {
                                block.y++;
                            }
                        }
                    }
                }
                this.removableLines = [];
                this.removeLineCounter = 0;
                this.renderGame = true;
                this.removeAnimation = false;
            }
            return;
        }
    
        //Checks if a new piece has to be spawned
        if (this.currentPiece == null) {
            if (this.bag.length == 0) {
                this.bag = [0, 1, 2, 3, 4, ,5 ,6].sort((a, b) => 0.5 - Math.random());
            }
            this.currentPiece = new Piece(this.bag[0]);
            this.bag.splice(0, 1);
            this.pieces.push(this.currentPiece);
            this.renderGame = true;
        }
    
        //player input handling
        if (isKeysPressed(['ArrowRight', 'd', 'D']) && this.moveTimer > this.moveDelay){
            this.currentPiece.moveRight(this.pieces);
            this.moveTimer = 0;
            this.renderGame = true;
        }
        if (isKeysPressed(['ArrowLeft', 'a', 'A']) && this.moveTimer > this.moveDelay){
            this.currentPiece.moveLeft(this.pieces);
            this.moveTimer = 0;
            this.renderGame = true;
        }
        if (isKeysPressed(['ArrowDown', 's', 'S'])){
            this.currentPiece.moveDown(this.pieces);
            this.renderGame = true;
        }
        if (isKeysPressed(['ArrowUp', 'w', 'W', ' ']) && this.rotationTimer > this.rotationDelay){
            this.currentPiece.rotate(this.pieces);
            this.rotationTimer = 0;
            this.renderGame = true;
        }
    
        //applying gravity
        if (this.gravityTimer > this.gravityDelay) {
            this.renderGame = true;
            if (!this.currentPiece.moveDown(this.pieces)) {
                for (let block of this.currentPiece.blocks) {
                    if (block.y == 1){
                        this.pieces = [];
                        return;
                    }
                }
                this.currentPiece = null;
                this.field = [];
                for (let i = 0; i <= FIELD_HEIGHT; i++) {
                    this.field.push([]);
                } 
                for (let piece of this.pieces) {
                    for (let block of piece.blocks) {
                        if (block.y >= 0) {
                            this.field[block.y].push({piece: piece, block: block});
                        }
                    }
                }
                let newCompletedLines = 0;
                for (let line of this.field) {
                    if (line.length > FIELD_LENGTH){
                        this.removeAnimation = true;
                        this.removableLines.push(line);
                        newCompletedLines++;
                        this.totalLines++;
                    }
                }
    
                for (let piece of this.pieces) {
                    if (piece.blocks.length == 0){
                        this.pieces.splice(this.pieces.indexOf(piece), 1);
                    }
                }
                this.computeLevel();
            }
            this.gravityTimer = 0;
        }
        this.moveTimer++;
        this.gravityTimer++;
        this.rotationTimer++;
    }


    degreesToRadians(degrees) {
        return degrees * (Math.PI/180);
    }
    
    computeScore(level, fallen, amountOfLines) {
        
    }
    
    computeLevel() {
        this.level = parseInt(this.totalLines / 10);
        GAME_LEVEL.innerHTML = String(this.level);
    }

    renderBlock(type, block) {
        GAME_CONTEXT.translate(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE);
        if (type != 6){
            GAME_CONTEXT.drawImage(images[type], 0, 0, BLOCK_SIZE, BLOCK_SIZE);
        } else { //Piece is an I
            GAME_CONTEXT.translate(BLOCK_SIZE/2, BLOCK_SIZE/2);
            GAME_CONTEXT.rotate(this.degreesToRadians(block.rot));
            GAME_CONTEXT.drawImage(images[block.texId], -BLOCK_SIZE/2, -BLOCK_SIZE/2, BLOCK_SIZE, BLOCK_SIZE);
            GAME_CONTEXT.rotate(this.degreesToRadians(-block.rot));
            GAME_CONTEXT.translate(-BLOCK_SIZE/2, -BLOCK_SIZE/2);
        }
        GAME_CONTEXT.translate(-block.x * BLOCK_SIZE, -block.y * BLOCK_SIZE);
    }


    render() {
        if (this.renderGame) {
            GAME_CONTEXT.clearRect(0, 0, CANVAS_PIXELS_WIDTH, CANVAS_PIXELS_HEIGHT);
            for (let piece of this.pieces) {
                for (let block of piece.blocks) {
                    this.renderBlock(piece.type, block);
                }
            }
            this.renderGame = false;
        }
        if (this.removeAnimation) {
            if (this.removeLineCounter % 10 == 0) {
                this.blink = !this.blink; 
            }
            for (let line of this.removableLines) {
                for (let item of line) {
                    if (this.blink){
                        GAME_CONTEXT.fillStyle = "#C3CFA1";
                        GAME_CONTEXT.fillRect(item.block.x * BLOCK_SIZE, item.block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);   
                    } else {
                        this.renderBlock(item.piece.type, item.block);
                    }
                }
            }
        }
    }
}
