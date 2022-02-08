const KEYS = [];

window.onkeyup = function(e) { KEYS[e.key] = false; }
window.onkeydown = function(e) { KEYS[e.key] = true; }

function isAnyKeyPressed(){
    for (var key in KEYS){
        if (KEYS[key]) return true;
    }
    return false;
}

function isKeysPressed(keys) {
    for (key of keys) {
        if (KEYS[key]) {
            return true;
        }
    }
    return false;
}

function isKeyPressed(key){ return KEYS[key]; }
