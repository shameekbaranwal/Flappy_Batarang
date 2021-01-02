let bird;
let blocks = [];
const maxLevel = 200;
let i;

function setup() {
  createCanvas(500, 500);
  restart(); 
}

function keyPressed() {
  if (key === ' ')
    bird.click();
  if (key === 'r') {
    // blocks = [];
    // bird = null;
    restart();
    console.log("New Game");
    loop();
  }
}

function mousePressed() {
  bird.click();
}

function restart() {
  bird = new Bird();
  frameRate(60);
  for (let i = 0; i < maxLevel; i++)
    blocks[i] = new Blocks(i);
  i = 0;
}

function draw() {
  background(100);
  bird.update();
  bird.hitBottom();
  bird.hitTop();
  bird.show();
  for (let block of blocks) {
    block.update();
    block.showTop();
    block.showBottom();
    if (block.birdHit(bird)) {
      noLoop();
      console.log("Game Over. Press R to restart.");
    }
    if (block.passed) {
      i++;
      block.passed = false;
      block.runCheck = false;
      console.log("SCORE: "+i);
    }
  }
}