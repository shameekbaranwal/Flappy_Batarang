let bird;
let blocks = [];
// const maxLevel = 200;
let score;
let birdImg;
let bgImg;
let tubeImg;
let pipe;
let highestScore;
let pointSFX;
let jumpSFX;
let hitSFX;
let gameOn;
let gamePaused;
let myFont;

function preload() {
  birdImg = loadImage('images/bat.png');
  bgImg = loadImage('images/batbg.png');
  pointSFX = loadSound('sfx/sfx_point.wav');
  jumpSFX = loadSound('sfx/sfx_jump.wav');
  hitSFX = loadSound('sfx/sfx_hit.wav');
  myFont = loadFont('./font/flappy.TTF');
}


function setup() {
  createCanvas(500, 500);
  angleMode(DEGREES);
  highestScore = 0;
  frameRate(30);
  image(bgImg, 0, 0, width, height);
  textFont(myFont);
  push();
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(50);
  text("FLAPPY BATARANG", 45, 150);
  textSize(20);
  text("press Enter to play", 130, 350);
  pop();
  // console.log('bruh');
  noLoop();
  gameOn = false;
  gamePaused = false;
}

//looping function
function draw() {
  if (gameOn && !gamePaused) {
    // background(bgImg);
    image(bgImg, 0, 0, width, height + 10);
    bird.update();
    bird.show();
    for (let block of blocks) {
      block.update();
      block.showTop();
      block.showBottom();
      if (block.passed) {
        pointSFX.play();
        score++;
        block.passed = false;
        block.runCheck = false;
        // console.log("SCORE: "+score);
      }
      if (block.offScreen()) {
        blocks.shift();
        let block = new Blocks(1);
        blocks.push(block);
      }
      if (block.birdHit(bird)) {
        hitSFX.play();
        gameOver();
        break;
      }
    }
    bird.hitBottom();
    bird.hitTop();
    showScore();
  }
}


function keyPressed() {
  if (key === ' ' && gameOn && !gamePaused) {
    bird.click();
    jumpSFX.play();
  }
  if (key === 'r' || keyCode === ENTER) {
    // console.log("New Game");
    restart();
    loop();
    gameOn = true;
    gamePaused = false;
  }
  if (key === 'p') {
    if (!gamePaused && gameOn) {
      gamePaused = true;
      push();
      textSize(35);
      fill(255);
      stroke(0);
      strokeWeight(3);
      text(`
        Paused

  Press P to resume
   or R to restart`, 50, 175);
      pop();
      noLoop();
    } else if (gamePaused && gameOn) {
      loop();
      gamePaused = false;
    }
  }
}


function mouseClicked() {
  if (gameOn && !gamePaused) {
    bird.click();
    jumpSFX.play();
  } else {
    restart();
    loop();
    gameOn = true;
  }
}


function restart() {
  bird = new Bird();
  frameRate(60);
  for (let i = 0; i < 3; i++)
    blocks[i] = new Blocks(i);
  score = 0;
  gameOn = true;
}


function showScore() {
  push();
  fill(255);
  stroke(0);
  strokeWeight(3);
  textSize(30);
  text(score, width - 40, 40);
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
  Highest : ${highestScore}`, 55, 150);
  textSize(35);
  text("Press R to restart", 70, 350);
  pop();
  gameOn = false;
}