var fps = 0;


function processGame(){
    updateTetris();
    renderTetris();
    fps++;
}

function resetFps(){
    console.log("FPS: " + fps);
    fps = 0;
}

window.setInterval(processGame, 16.5);
window.setInterval(resetFps, 1000);