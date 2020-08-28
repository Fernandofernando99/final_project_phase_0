let canvas = document.getElementById("canvas");
// console.log(canvas);
canvas.width = 600;
canvas.height = 350;

let ctx = canvas.getContext("2d"); //untuk rendering di browser dalam konteks 2dimensi
let score = document.getElementById("score");
let scoreValue = 0;
let sizeHeigth = 50;
let sizeWidth = 50;
let foxX = Math.random() * (canvas.width-sizeWidth);
let foxY = Math.random() * (canvas.height-sizeHeigth);
let covX = Math.random() * (canvas.width-sizeWidth);
let covY = Math.random() * (canvas.height-sizeHeigth);
let foxdx = (Math.random() + 2.25) * 3;
let foxdy = (Math.random() + 2.25) * 3;
let covdx = (Math.random() + 1.5) * 2.25;
let covdy = (Math.random() + 1.5) * 2.25;
var toggle;
let scoreStop = false;
var image = document.getElementById("logo");
let imagepattern = ctx.createPattern(image, "repeat");
let timeBeforeBanish = 5;
let ctDown = 5;
let ctDowntoDisplay = document.getElementById("countDownTime");
var atur;
var gameOverSnd = document.getElementById("gameOverSound");
var scoringSnd = document.getElementById("scoringSound");

function countDown() { 
  if (ctDown === 0) {
    ctDown = 0;
    ctDowntoDisplay.innerHTML = "GO - Score Now";
  } else {
    ctDowntoDisplay.innerHTML = ctDown;
    ctDown -= 1;
  }
  timeBeforeBanish -= 1;
}

function animate() {  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = `rgba(0,120,100,${String(timeBeforeBanish/5)})`;;
  ctx.fill();
  ctx.fillRect(foxX, foxY, sizeWidth, sizeHeigth);
  if (foxX >= canvas.width - sizeWidth || foxX < 0) {
    foxdx = -foxdx;
  }
  if (foxY >= canvas.height - sizeHeigth || foxY < 0) {
    foxdy = -foxdy;
  } 
  foxX += foxdx;
  foxY += foxdy;
  ctx.fillStyle = `rgba(0,0,0,${String(timeBeforeBanish/5)})`;
  ctx.fillRect(covX, covY, sizeWidth, sizeHeigth);
  if (covX >= canvas.width - sizeWidth || covX < 0) {
    covdx = -covdx;
  }
  if (covY >= canvas.height - sizeHeigth || covY < 0) {
    covdy = -covdy;
  } 
  covX += covdx;
  covY += covdy;
  toggle = window.requestAnimationFrame(animate);
}

function gameStarted () {
  stopBtn.disabled = false;
  startBtn.disabled = true;
  stopBtn.style.color = "#ff5722";
  startBtn.style.color = "black";
  scoreValue = 0;
  score.innerHTML = scoreValue;
  scoreStop = false;
  atur = setInterval(countDown,1000);
}

function stopAnimate () { 
  window.cancelAnimationFrame(toggle);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  startBtn.style.color = "#ff5722";
  stopBtn.style.color = "black";
  scoreStop = true;
  clearInterval(atur);  
  ctDown = 5;
  timeBeforeBanish = 5;
  ctDowntoDisplay.innerHTML = "Game Stopped - Cannot Score";
}

let startBtn = document.getElementById("startButton");
startBtn.addEventListener("click", animate);
startBtn.disabled = false;

let stopBtn = document.getElementById("stopButton");
stopBtn.addEventListener("click", stopAnimate);
stopBtn.disabled = true;

canvas.addEventListener("click", function blueClicked(event) {
  let pos = {
    x: event.offsetX,
    y: event.offsetY
  };
  if (ctDown <= 0) {
    timeBeforeBanish = 1;
  }
  if (pos.x >= foxX && pos.x <= foxX+sizeWidth && pos.y >= foxY && pos.y <= foxY+sizeHeigth) {
    if (scoreStop === false && ctDown <= 0) {
      scoringSnd.play();
      scoreValue++;
      score.innerHTML = scoreValue;
    }
  } else if (pos.x >= covX && pos.x <= covX+sizeWidth && pos.y >= covY && pos.y <= covY+sizeHeigth) {
    stopAnimate();
    gameOverSnd.play();
  }
}); 




