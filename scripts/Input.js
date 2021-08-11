const KEYS = [];

window.onkeyup = function(e) { KEYS[e.key] = false; }
window.onkeydown = function(e) { KEYS[e.key] = true; }

function isKeyPressed(key){ return KEYS[key]; }