let fps = 0;

let game = new TetrisGame();
let gameStarted = false;

function processGame() {
    if (gameStarted){
        game.update();
        game.render();
    }else{
        gameStarted = isAnyKeyPressed();
        if (gameStarted){
            document.getElementById('main-menu').style.visibility = 'hidden';
            document.getElementById('game-div').style.visibility = 'visible';
        }
    }
    fps++;
}

function resetFps() {
    console.log("FPS: " + fps);
    fps = 0;
}

window.setInterval(processGame, 16.5);
window.setInterval(resetFps, 1000);
