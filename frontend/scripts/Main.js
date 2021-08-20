var fps = 0;


function processGame(){
    if (gameStarted){
        update();
        render();
    }else{
        gameStarted = isAnyKeyPressed();
    }
    fps++;
}

function resetFps(){
    console.log("FPS: " + fps);
    fps = 0;
}

window.setInterval(processGame, 16.5);
window.setInterval(resetFps, 1000);