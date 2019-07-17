var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var bd = new Image();
var bg = new Image();
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bd.src = "assets/images/bird.png";
bg.src = "assets/images/bg.png";
fg.src = "assets/images/fg.png";
pipeNorth.src = "assets/images/pipeNorth.png";
pipeSouth.src = "assets/images/pipeSouth.png";

var gap = 85; //Beetween pipes

var bX = 10;
var bY = 150;

var gravity = 1.5;

var score = 0;

function draw(){
    ctx.drawImage(bg,0,0);
    ctx.drawImage(fg,0,(canvas.height-fg.height));

    var bird = ctx.drawImage(bd, bX, bY);
    requestAnimationFrame(draw);


    bY += gravity

}

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp); //able to use mouse too.

function moveUp(){
    bY -= 25;
}

draw();