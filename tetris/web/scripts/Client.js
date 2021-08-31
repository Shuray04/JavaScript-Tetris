const socket = io();

socket.on("connect", () => {
    console.log("bit connneeeect");
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


//window.setInterval(demandGameUpdate, 17);