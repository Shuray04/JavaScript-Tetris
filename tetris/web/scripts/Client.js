const socket = io();
var gameStarted = false;

socket.on("connect", () => {
    console.log("biiiit connneeeect");
});

socket.on("message", (data) => {
    console.log(data);
    render(data);
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
            socket.send(input);
            return;
            
        }
    }else{
        socket.send(input);
    }
}

window.setInterval(demandGameUpdate, 50);