const PIECE_Z = 0;
const PIECE_J = 1;
const PIECE_L = 2;
const PIECE_O = 3;
const PIECE_S = 4;
const PIECE_T = 5;
const PIECE_I = 6;
const FIELD_HEIGHT = 17;
const FIELD_LENGTH = 9;

const rotationAngle = (Math.PI / 180) * -90;

class Piece{
    constructor(type){
        this.type = type;
        switch(type){
            case PIECE_J: this.blocks = [{x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}]; break;
            case PIECE_L: this.blocks = [{x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 3, y: 2}]; break;
            case PIECE_O: this.blocks = [{x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}]; break;
            case PIECE_S: this.blocks = [{x: 4, y: 1}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 1}]; break;
            case PIECE_T: this.blocks = [{x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 1}, {x: 5, y: 1}]; break;
            case PIECE_Z: this.blocks = [{x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 1}, {x: 5, y: 2}]; break;
            case PIECE_I: this.blocks = [{x: 4, y: 1, rot: 90, texId: 6}, {x: 5, y: 1, rot: 90, texId: 6}, {x: 3, y: 1, rot: 270, texId: 7}, {x: 6, y: 1, rot: 90, texId: 7}]; break;
        }
    }
    
    moveDown(pieces){
        const newBlocks = [];
        for (var i in this.blocks){ newBlocks[i] = Object.assign({}, this.blocks[i]); }
        newBlocks.forEach(block => block.y++);
        if (this.checkCollision(newBlocks, pieces)){ 
            return false;
        }else{
            this.blocks = newBlocks;
            return true;
        }
    }

    moveRight(pieces){
        const newBlocks = [];
        for (var i in this.blocks){ newBlocks[i] = Object.assign({}, this.blocks[i]); }
        newBlocks.forEach(block => block.x++);
        if (this.checkCollision(newBlocks, pieces)){ 
            return false;
        }else{
            this.blocks = newBlocks;
            return true;
        }
    }

    moveLeft(pieces){
        const newBlocks = [];
        for (var i in this.blocks){ newBlocks[i] = Object.assign({}, this.blocks[i]); }
        newBlocks.forEach(block => block.x--);
        if (this.checkCollision(newBlocks, pieces)){ 
            return false;
        }else{
            this.blocks = newBlocks;
            return true;
        }
    }

    checkCollision(newBlocks, pieces){
        for (var block in newBlocks){
            if (newBlocks[block].x < 0 || newBlocks[block].x > FIELD_LENGTH || newBlocks[block].y > FIELD_HEIGHT) {
                return true;
            }
            for (var otherpieces in pieces){
                if (this == pieces[otherpieces]) continue; 
                for (var otherBlocks in pieces[otherpieces].blocks){
                    if (newBlocks[block].y == pieces[otherpieces].blocks[otherBlocks].y 
                        && newBlocks[block].x == pieces[otherpieces].blocks[otherBlocks].x){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rotate(pieces){
        if (this.type == PIECE_O) return; 

        var centerX = this.blocks[0].x;
        var centerY = this.blocks[0].y;
        var newBlocks = [];

        newBlocks.push({x: this.blocks[0].x, y: this.blocks[0].y});

        for (var block in this.blocks){
            if (block == 0) continue;
            var blockX = this.blocks[block].x;
            var blockY = this.blocks[block].y;
            newBlocks.push({
                x: Math.round(centerX + (blockX-centerX)*Math.cos(rotationAngle) - (blockY-centerY)*Math.sin(rotationAngle)),
                y: Math.round(centerY + (blockX-centerX)*Math.sin(rotationAngle) + (blockY-centerY)*Math.cos(rotationAngle))
            });
        }
        if (!this.checkCollision(newBlocks, pieces)){
            if (this.type == PIECE_I){
                for (var block in this.blocks){
                    newBlocks[block]["rot"] = this.blocks[block].rot+270;
                    newBlocks[block]["texId"] = this.blocks[block].texId;
                }
            }
            this.blocks = newBlocks;
        } 
    }
}

module.exports = Piece;