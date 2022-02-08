const PIECE_Z = 0;
const PIECE_J = 1;
const PIECE_L = 2;
const PIECE_O = 3;
const PIECE_S = 4;
const PIECE_T = 5;
const PIECE_I = 6;

const ROTATION_ANGLE = (Math.PI / 180) * -90;
const ROTATION_COS = Math.cos(ROTATION_ANGLE);
const ROTATION_SIN = Math.sin(ROTATION_ANGLE);

const images = [];
for (let i = 0; i < 8; i++){ images.push(new Image(0, 0)); }

images[0].src = "img/piece_texture/piece_z.png";
images[1].src = "img/piece_texture/piece_j.png";
images[2].src = "img/piece_texture/piece_l.png";
images[3].src = "img/piece_texture/piece_o.png";
images[4].src = "img/piece_texture/piece_s.png";
images[5].src = "img/piece_texture/piece_t.png";
images[6].src = "img/piece_texture/piece_i_mid.png";
images[7].src = "img/piece_texture/piece_i_top.png";

class Piece{
    constructor(type) {
        this.type = type;
        switch(type) {
            case PIECE_J: this.blocks = [{x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 5, y: 2}]; break;
            case PIECE_L: this.blocks = [{x: 4, y: 1}, {x: 3, y: 1}, {x: 5, y: 1}, {x: 3, y: 2}]; break;
            case PIECE_O: this.blocks = [{x: 4, y: 1}, {x: 5, y: 1}, {x: 4, y: 2}, {x: 5, y: 2}]; break;
            case PIECE_S: this.blocks = [{x: 4, y: 1}, {x: 3, y: 2}, {x: 4, y: 2}, {x: 5, y: 1}]; break;
            case PIECE_T: this.blocks = [{x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 1}, {x: 5, y: 1}]; break;
            case PIECE_Z: this.blocks = [{x: 4, y: 1}, {x: 4, y: 2}, {x: 3, y: 1}, {x: 5, y: 2}]; break;
            case PIECE_I: this.blocks = [{x: 4, y: 1, rot: 90, texId: 6}, {x: 5, y: 1, rot: 90, texId: 6}, {x: 3, y: 1, rot: 270, texId: 7}, {x: 6, y: 1, rot: 90, texId: 7}]; break;
        }
    }
    
    moveDown(pieces) {
        const newBlocks = [];
        for (let i in this.blocks) {
            newBlocks[i] = Object.assign({}, this.blocks[i]);
        }
        newBlocks.forEach(block => block.y++);
        if (!this.checkCollision(newBlocks, pieces)) { 
            this.blocks = newBlocks; 
            return true;
        }
        return false;
    }

    moveRight(pieces) {
        const newBlocks = [];
        for (let i in this.blocks) {
            newBlocks[i] = Object.assign({}, this.blocks[i]); 
        }
        newBlocks.forEach(block => block.x++);
        if (!this.checkCollision(newBlocks, pieces)) {
            this.blocks = newBlocks;
        } 
    }

    moveLeft(pieces) {
        const newBlocks = [];
        for (let i in this.blocks) { 
            newBlocks[i] = Object.assign({}, this.blocks[i]); 
        }
        newBlocks.forEach(block => block.x--);
        if (!this.checkCollision(newBlocks, pieces)) {
            this.blocks = newBlocks;
        }
    }

    checkCollision(newBlocks, pieces) {
        for (let block in newBlocks) {
            if (newBlocks[block].x < 0 || newBlocks[block].x > FIELD_LENGTH || newBlocks[block].y > FIELD_HEIGHT) {
                return true;
            }
            for (let otherPiece in pieces) {
                if (this == pieces[otherPiece]) {
                    continue; 
                } 
                for (let otherBlocks in pieces[otherPiece].blocks) { 
                    if (newBlocks[block].y == pieces[otherPiece].blocks[otherBlocks].y 
                        && newBlocks[block].x == pieces[otherPiece].blocks[otherBlocks].x) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    rotate(pieces) {
        if (this.type == PIECE_O) {
            return; 
        }

        let centerX = this.blocks[0].x;
        let centerY = this.blocks[0].y;
        let newBlocks = [];

        newBlocks.push({x: this.blocks[0].x, y: this.blocks[0].y});

        for (let block in this.blocks) {
            if (block == 0) {
                continue;
            }
            let blockX = this.blocks[block].x;
            let blockY = this.blocks[block].y;
            newBlocks.push({
                x: Math.round(centerX + (blockX-centerX)*ROTATION_COS - (blockY-centerY)*ROTATION_SIN),
                y: Math.round(centerY + (blockX-centerX)*ROTATION_SIN + (blockY-centerY)*ROTATION_COS)
            });
        }
        if (!this.checkCollision(newBlocks, pieces)) {
            if (this.type == PIECE_I) {
                for (let block in this.blocks) {
                    newBlocks[block]["rot"] = this.blocks[block].rot+270;
                    newBlocks[block]["texId"] = this.blocks[block].texId;
                }
            }
            this.blocks = newBlocks;
        } 
    }
}
