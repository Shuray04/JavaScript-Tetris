var fps = 0;

onGameResize();

function processGame(){
    updateGame();
    renderGame();

    fps++;
}

function resetFps(){
    console.log(fps);
    fps = 0;
}

window.setInterval(processGame, 16)
window.setInterval(resetFps, 1000);