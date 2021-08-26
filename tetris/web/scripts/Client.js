const socket = io();
var gameStarted = false;
var storedPieces = [];

var startTime = 0;
var endTime = 0;

socket.on("connect", () => {
    console.log("biiiit connneeeect");
});

socket.on("message", (data) => {
    endTime = Date.now();
    console.log("received package in: ", endTime - startTime);
    if (pieces.length < data.amountOfPieces && data.currentPiece != null){
        pieces.push(data.currentPiece);
    }else if (pieces.length = data.amountOfPieces && data.currentPiece != null){
        pieces[pieces.length-1] = data.currentPiece;
    }
    if (data.resetBlocks != false){
        pieces = data.resetBlocks;
    }
    render(data.removeLineCounter, data.removableLines);
});

function demandGameUpdate(){
    var input = {
        up: isKeyPressed('ArrowUp'),
        down: isKeyPressed('ArrowDown'),
        left: isKeyPressed('ArrowLeft'),
        right: isKeyPressed('ArrowRight')
    }
    if (!gameStarted){
        if (isAnyKeyPressed()){
            gameStarted = true;
            document.getElementById('main-menu').style.visibility = 'hidden';
            document.getElementById('game-div').style.visibility = 'visible';
            //socket.send(input);
            return;
        }
    }else{
        socket.send(input);
        startTime = Date.now();
    }
}

window.setInterval(demandGameUpdate, 17);