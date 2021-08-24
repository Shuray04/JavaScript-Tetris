class GameHandler{
    constructor(){
        this.FIELD_LENGTH = 9;
        this.FIELD_HEIGHT = 17;
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
        this.gameStarted = false;

        this.removeAnimation = false;
        this.field = [];
        this.removableLines = [];
        this.blink = false;
        this.bag = createBag();
    }

    createBag(){
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

    update(){
        //Updates the remove Animation if a piece is removed
        if (removeAnimation){
            removeLineCounter++;
            if (removeLineCounter >= 93){
                removableLines.forEach(function(line){
                    line.forEach(function(item){ item.piece.blocks.splice(item.piece.blocks.indexOf(item.block), 1); });
                    pieces.forEach(function(piece){
                        piece.blocks.forEach(function(block){
                            if (block.y < field.indexOf(line)) block.y++;
                        });
                    });
                });
                removableLines = [];
                removeLineCounter = 0;
                renderGame = true;
                removeAnimation = false;
            }
            return;
        }
    
        //Checks if a new piece has to be spawned
        if (currentPiece == null){
            if (bag.length == 0){
                bag = createBag();
            }
            currentPiece = new Piece(bag[0]);
            bag.splice(0, 1);
            pieces.push(currentPiece);
            renderGame = true;
        }
    
        //player input handling
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
    
        //applying gravity
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
                for (var i = 0; i <= FIELD_HEIGHT; i++) field.push([]);
                pieces.forEach(function(piece){
                    piece.blocks.forEach(function(block){
                        if (block.y >= 0) field[block.y].push({piece: piece, block: block}); 
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
}