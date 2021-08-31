var input = {
    "ArrowUp": false,
    "ArrowDown": false,
    "ArrowLeft": false,
    "ArrowRight": false,
    "Any": false,
}

window.onkeyup = function(e) {
    if (e.key == "ArrowUp" ||
        e.key == "ArrowDown" || 
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight"){
        input[e.key] = false;
    }else{
        input[Any] = false;
    }
    socket.send(input);
}

window.onkeydown = function(e) {
    if (e.key == "ArrowUp" ||
        e.key == "ArrowDown" || 
        e.key == "ArrowLeft" ||
        e.key == "ArrowRight"){
        input[e.key] = true;
    }else{
        input[Any] = true;
    }
    socket.send(input);
}