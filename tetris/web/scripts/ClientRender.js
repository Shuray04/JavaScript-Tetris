const GAME_CONTEXT = document.getElementById('game-canvas').getContext('2d');
GAME_CONTEXT.imageSmoothingEnabled = false;
const GAME_SCORE = document.getElementById('score');
const GAME_LEVEL = document.getElementById('level');
const GAME_LINES = document.getElementById('lines');

const CANVAS_PIXELS_WIDTH = 160;
const CANVAS_PIXELS_HEIGHT = 144;
const BLOCK_SIZE = 8;

const PIECE_Z = 0;
const PIECE_J = 1;
const PIECE_L = 2;
const PIECE_O = 3;
const PIECE_S = 4;
const PIECE_T = 5;
const PIECE_I = 6;

const rotationAngle = (Math.PI / 180) * -90;

const IMAGES = [];
for (var i = 0; i < 8; i++){ images.push(new Image(0, 0)); }

IMAGES[0].src = "img/piece_texture/piece_z.png";
IMAGES[1].src = "img/piece_texture/piece_j.png";
IMAGES[2].src = "img/piece_texture/piece_l.png";
IMAGES[3].src = "img/piece_texture/piece_o.png";
IMAGES[4].src = "img/piece_texture/piece_s.png";
IMAGES[5].src = "img/piece_texture/piece_t.png";
IMAGES[6].src = "img/piece_texture/piece_i_mid.png";
IMAGES[7].src = "img/piece_texture/piece_i_top.png";

function degreesToRadians(degrees){
    return degrees * (Math.PI/180);
}
  
function renderBlock(type, block){
    GAME_CONTEXT.translate(block.x * BLOCK_SIZE, block.y * BLOCK_SIZE);
    if (type != 6){
        GAME_CONTEXT.drawImage(images[type], 0, 0, BLOCK_SIZE, BLOCK_SIZE);
    }else{ //Piece is an I

        GAME_CONTEXT.translate(BLOCK_SIZE/2, BLOCK_SIZE/2);
        GAME_CONTEXT.rotate(degreesToRadians(block.rot));
        GAME_CONTEXT.drawImage(images[block.texId], -BLOCK_SIZE/2, -BLOCK_SIZE/2, BLOCK_SIZE, BLOCK_SIZE);
        GAME_CONTEXT.rotate(degreesToRadians(-block.rot));
        GAME_CONTEXT.translate(-BLOCK_SIZE/2, -BLOCK_SIZE/2);
    }
    GAME_CONTEXT.translate(-block.x * BLOCK_SIZE, -block.y * BLOCK_SIZE);
}


function render(pieces){
    GAME_CONTEXT.clearRect(0, 0, CANVAS_PIXELS_WIDTH, CANVAS_PIXELS_HEIGHT);
    pieces.forEach(function(piece){
        piece.blocks.forEach(function(block){
            renderBlock(piece.type, block);
        });
    });
    renderGame = false;
    
    if (removeAnimation){
        if (removeLineCounter % 10 == 0){ blink = !blink; }
        removableLines.forEach(function(line){
            line.forEach(function(item){
                if (blink){
                    GAME_CONTEXT.fillStyle = "#C3CFA1";
                    GAME_CONTEXT.fillRect(item.block.x * BLOCK_SIZE, item.block.y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);   
                }else{
                    renderBlock(item.piece.type, item.block);
                }
            });
        });
    }
}

const socket = io();

socket.on("connect", () => {
    console.log("biiiit connneeeect");
});

socket.on("message", (data) => {
    console.log(data);
    render(data);
});

function getInformation(){
    socket.send(true);
}


