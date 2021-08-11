const PIECE_I = 0;
const PIECE_J = 1;
const PIECE_L = 2;
const PIECE_O = 3;
const PIECE_S = 4;
const PIECE_T = 5;
const PIECE_Z = 6;

const rotationAngle = (Math.PI / 180) * -90;

class Piece{
    constructor(type){
        this.type = type;
        switch(type){
            case PIECE_I:
                this.blocks = [{x: 3, y: 0}, {x: 4, y: 0}, {x: 5, y: 0}, {x: 6, y: 0}];
                this.color = "#1cb2f5";
                break;
            case PIECE_J:
                this.blocks = [{x: 4, y: 0}, {x: 3, y: 0}, {x: 5, y: 0}, {x: 5, y: 1}];
                this.color = "#00008B";
                break;
            
            case PIECE_L:
                this.blocks = [{x: 4, y: 0}, {x: 3, y: 0}, {x: 5, y: 0}, {x: 3, y: 1}];
                this.color = "#ffa500";
                break;
            
            case PIECE_O:
                this.blocks = [{x: 4, y: 0}, {x: 5, y: 0}, {x: 4, y: 1}, {x: 5, y: 1}];
                this.color = "#ffff00";
                break;
            
            case PIECE_S:
                this.blocks = [{x: 4, y: 0}, {x: 3, y: 1}, {x: 4, y: 1}, {x: 5, y: 0}];
                this.color = "#00ff00";
                break;
            
            case PIECE_T:
                this.blocks = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 3, y: 0}, {x: 5, y: 0}];
                this.color = "#800080";
                break;
            
            case PIECE_Z:
                this.blocks = [{x: 4, y: 0}, {x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 0}];
                this.color = "#FF0000";
                break;           
        }
    }
    
    moveDown(){
        for (var block in this.blocks){
            if (this.blocks[block].y+1 > FIELD_HEIGHT){ return false; }
            for (var otherPieces in PIECES){
                if (this == PIECES[otherPieces]){ continue; }
                for (var otherBlocks in PIECES[otherPieces].blocks){
                    if (this.blocks[block].y+1 == PIECES[otherPieces].blocks[otherBlocks].y 
                        && this.blocks[block].x == PIECES[otherPieces].blocks[otherBlocks].x){
                        return false;
                    }
                }
            }
        }
        this.blocks.forEach(block => block.y++);
        return true;
    }

    moveRight(){
        for (var block in this.blocks){
            if (this.blocks[block].x+1 > FIELD_LENGTH){ return; }
            for (var otherPieces in PIECES){
                if (this == PIECES[otherPieces]){ continue; }
                for (var otherBlocks in PIECES[otherPieces].blocks){
                    if (this.blocks[block].y == PIECES[otherPieces].blocks[otherBlocks].y 
                        && this.blocks[block].x+1 == PIECES[otherPieces].blocks[otherBlocks].x){
                        return;
                    }
                }
            }
        }
        this.blocks.forEach(block => block.x++);
    }

    moveLeft(){
        for (var block in this.blocks){
            if (this.blocks[block].x-1 < 0){ return; }
            for (var otherPieces in PIECES){
                if (this == PIECES[otherPieces]){ continue; }
                for (var otherBlocks in PIECES[otherPieces].blocks){
                    if (this.blocks[block].y == PIECES[otherPieces].blocks[otherBlocks].y 
                        && this.blocks[block].x-1 == PIECES[otherPieces].blocks[otherBlocks].x){
                        return;
                    }
                }
            }
        }
        this.blocks.forEach(block => block.x--);
    }

    rotate(){
        if (this.type == PIECE_O){ return; }

        var centerX = this.blocks[0].x;
        var centerY = this.blocks[0].y;
        var newBlocks = []

        if (this.type == PIECE_I){
            //continue
        }else{
            newBlocks.push({x: this.blocks[0].x, y: this.blocks[0].y}); 
        }

        for (var block in this.blocks){
            if (block == 0) { continue; }
            var blockX = this.blocks[block].x;
            var blockY = this.blocks[block].y;
            var newX = Math.round(centerX + (blockX-centerX)*Math.cos(rotationAngle) - (blockY-centerY)*Math.sin(rotationAngle));
            var newY = Math.round(centerY + (blockX-centerX)*Math.sin(rotationAngle) + (blockY-centerY)*Math.cos(rotationAngle));
            if (newX < 0 || newX > FIELD_LENGTH || newY > FIELD_HEIGHT){ return; }
            for (var otherPieces in PIECES){
                if (this == PIECES[otherPieces]){ continue; }
                for (var otherBlocks in PIECES[otherPieces].blocks){
                    if (newY == PIECES[otherPieces].blocks[otherBlocks].y 
                        && newX == PIECES[otherPieces].blocks[otherBlocks].x){
                        return;
                    }
                }
            }
            newBlocks.push({x: newX, y: newY})
        }
        this.blocks = newBlocks;
    }
}