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

function preload() {
  birdImg = loadImage('images/bat.jpg');
  bgImg = loadImage('images/batbg6.jpg');
  // pipeImg = loadImage('images/pipe.png');
  launchImg = loadImage('images/batlaunch.jpeg');
  pointSFX = loadSound('sfx/sfx_point.wav');
  jumpSFX = loadSound('sfx/sfx_jump.wav');
  hitSFX = loadSound('sfx/sfx_hit.wav');
  // tubeImg = loadImage('images/building1.png');
}

function setup() {
  createCanvas(500, 500);
  fullscreen();
  highestScore = 0;
  // restart(); 
  frameRate(30);
  image(launchImg, 0, 0, width, height);
  console.log('bruh');
  noLoop();
  gameOn = false;
}

function keyPressed() {
  if (key === ' ' && gameOn) {
    bird.click();
    jumpSFX.play();
  }
  if (key === 'r' || keyCode === ENTER) {
    // console.log("New Game");
    restart();
    loop();
    gameOn = true;
  }
}

function mouseClicked() {
  if (gameOn) {
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

function draw() {
  if (gameOn) {
    // background(bgImg);
    image(bgImg, 0, 0, width, height + 10);
    bird.update();
    bird.hitBottom();
    bird.hitTop();
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
      if (block.birdHit(bird)) {
        hitSFX.play();
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
  }
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
  Highest : ${highestScore}`, 100, 150);
  textSize(20);
  text("   Press R to restart", 150, 350);
  pop();
  gameOn = false;
}