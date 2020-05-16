const setupData = require('../data/config.json')
const radius = setupData.radius
const speed = setupData.speed

var interval;

function update() {

    return {
        updateHuman: (id,positions) => updateHuman(id,positions),
        updateBotWithInterval: (id,positions) => updateBotWithInterval(id,positions)
    }

}
function updateBotWithInterval(id, position) {
    var rand = Math.random() * 1000;
    var myFunc = function() {
        imitateHuman(id, position);
        setTimeout(myFunc, rand)
    };
    rand = Math.random() * 1000;
    console.log("rand: " + rand);
    setTimeout(myFunc, rand)
}

//goal of this function is to imitate human mouse
function imitateHuman(id, players){
    const oldX = players[id].mouseX
    const oldY = players[id].mouseY
    const rand = Math.random();
    const angle = rand*Math.PI*2;

    const randX = Math.random();
    const randY = Math.random();

    const factorX = (randX < 0.5 ? 1-randX : randX) > 0.75 ? 1 : -1;
    const factorY = (randY < 0.5 ? 1-randY : randY) > 0.75 ? 1 : -1;

    players[id].mouseX += factorX * 10 * Math.cos(angle);
    players[id].mouseY += factorY * 10 * Math.sin(angle);

    if(outOfBounds(players[id].mouseX,players[id].w)){
        players[id].mouseX = oldX
    }
    if(outOfBounds(players[id].mouseY,players[id].h)){
        players[id].mouseY = oldY
    }
    //console.log(distance(players[id].x - oldX, players[id].y - oldY))
}

function updateHuman(id,positions){

    const mouseX = positions[id].mouseX
    const mouseY = positions[id].mouseY

    const oldX = positions[id].x
    const oldY = positions[id].y
    var newX = oldX
    var newY = oldY

    const diffX = mouseX - oldX
    const diffY = mouseY - oldY
    const angle = Math.atan(diffY/diffX)
    const factor = diffX > 0 ? 1 : -1;

    //console.log(mouseX,mouseY)

    if(distance(diffX,diffY) > radius){

        // console.log('updated Position')

        newX += factor * speed * Math.cos(angle)
        newY += factor * speed * Math.sin(angle)

        if(outOfBounds(newX,radius)){
        newX = oldX
        }
        if(outOfBounds(newY,radius)){
        newY = oldY
        }

        positions[id].x = newX
        positions[id].y = newY

    }

}

function distance(a,b){
    return Math.sqrt(a*a+b*b)
}

function outOfBounds(c,radius){
    return c<radius || c>(1 - radius)
}

module.exports = update
