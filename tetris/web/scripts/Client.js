const socket = io();
var gameStarted = false;
var storedPieces = [];
var running = false;

socket.on("connect", () => {
    console.log("biiiit connneeeect");
});

socket.on("message", (data) => {
    if (data.running != running){
        running = !running;
        if (running){
            document.getElementById('main-menu').style.visibility = 'hidden';
            document.getElementById('game-div').style.visibility = 'visible';
        }else{
            document.getElementById('main-menu').style.visibility = 'visible';
            document.getElementById('game-div').style.visibility = 'hidden';
        }
    }
    if (pieces.length < data.amountOfPieces && data.currentPiece != null){
        pieces.push(data.currentPiece);
    }else if (pieces.length = data.amountOfPieces && data.currentPiece != null){
        pieces[pieces.length-1] = data.currentPiece;
    }
    if (data.resetBlocks != false){
        pieces = data.resetBlocks;
    }
    render(data.removeLineCounter, data.removableLines);
    console.log("sdfsdf");
});

function demandGameUpdate(){
    var input = {
        up: isKeyPressed('ArrowUp'),
        down: isKeyPressed('ArrowDown'),
        left: isKeyPressed('ArrowLeft'),
        right: isKeyPressed('ArrowRight'),
        any: isAnyKeyPressed()
    }
    if (!gameStarted){
        if (isAnyKeyPressed()){
            gameStarted = true;
            //socket.send(input);
            return;
        }
    }else{
        socket.send(input);
        startTime = Date.now();
    }
}

//window.setInterval(demandGameUpdate, 17);