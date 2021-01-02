let bird;
let blocks = [];
const maxLevel = 200;
let score;
let birdImg;
let bgImg;
let pipe;
let highestScore;
let jumpSound;

function preLoad() {
}

function setup() {
  createCanvas(500, 500);
  birdImg = loadImage('images/bird.png');
  bgImg = loadImage('images/bg.jpg');
  pipeImg = loadImage('images/pipe.png');
  highestScore = 0;
  restart(); 
  frameRate(30);
  // noLoop();
  text("Press Enter to begin", 120, 350);
}

function keyPressed() {
  if (key === ' ')
    bird.click();
  if (key === 'r') {
    restart();
    // console.log("New Game");
    loop();
  }
}

function mousePressed() {
  bird.click();
}

function restart() {
  bird = new Bird();
  frameRate(60);
  for (let i = 0; i < 3; i++)
    blocks[i] = new Blocks(i);
  score = 0;
}

function draw() {
  background(bgImg);
  bird.update();
  bird.hitBottom();
  bird.hitTop();
  bird.show();
  for (let block of blocks) {
    block.update();
    block.showTop();
    block.showBottom();
    if (block.passed) {
      score++;
      block.passed = false;
      block.runCheck = false;
      // console.log("SCORE: "+score);
    }
    if (block.birdHit(bird)) {
      gameOver();
      break;
    }
    if (block.offScreen()) {
      blocks.shift();
      let block = new Blocks(1);
      blocks.push(block);
    }
  }
  showScore();
  // console.log(blocks.length);
}

function showScore() {
  push();
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(30);
  text(score, width-40, 40);
  pop();
}

function gameOver() {
  noLoop();
  push();
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(50);
  highestScore = max(highestScore, score);
  text(`
  Score : ${score}
  Highest : ${highestScore}`, 100, 150);
  textSize(20);
  text("   Press R to restart", 150, 350);
  pop();
}