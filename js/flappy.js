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
var originalGravity = 1.5;

var score = 0;

var pipe = [];

pipe[0] = {
    x : canvas.width,
    y : 0,
};

var dead = 0;

function draw(){
    ctx.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        ctx.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeSouth, pipe[i].x, (pipe[i].y+(pipeNorth.height+gap)));

        if(!dead)
            pipe[i].x--;

        if(pipe[i].x == (canvas.width/2)){
            pipe.push({
                x: canvas.width,
                y: Math.floor(Math.random() * pipeNorth.height) - pipeNorth.height
            });
        }

        //Colision. Pipes and Floor, respectively
        if(bX + bd.width >= pipe[i].x && bX <= pipe[i].x + pipeNorth.width
            && (bY <= pipe[i].y + pipeNorth.height || bY+bd.height >= pipe[i].y+(pipeNorth.height+gap)) 
            || bY + bd.height >= canvas.height - fg.height){
                dead = 1;
        }

        if(pipe[i].x == 9){
            score++;
        }
    }

    ctx.drawImage(fg,0,(canvas.height-fg.height));

    var bird = ctx.drawImage(bd, bX, bY);

    ctx.fillStyle = "#FFFFFF";
    ctx.strokeStyle = "#000000";
    ctx.font = "70px Flappy";

    ctx.fillText(score, (canvas.width/2)-10, 80);
    ctx.strokeText(score, (canvas.width/2)-10, 80);

    if (dead){
        gameOver();
    }else{
        requestAnimationFrame(draw);
    }

    bY += gravity

}

document.addEventListener("keydown",moveUp);
document.addEventListener("click",moveUp); //able to use mouse too.

function moveUp(){

    if(!dead){
        gravity = -5;

        setTimeout(function(){
            gravity = originalGravity;
        },80);
    }

}

function gameOver(){
    gravity = 0;
    var retVal = confirm("Do you want to restart? Your score is " + score);

    if(retVal){
        dead = 0;
        score = 0;
        gravity = originalGravity;
        bY = 150;

        pipe = [];
        pipe[0] = {
            x: canvas.width,
            y: 0
        }
        draw();
    }
}

window.onload = function () {
    draw();
}