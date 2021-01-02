class Blocks {

    constructor(i) {
        this.gapSize = 100;
        this.gapLocation = random(20 + this.gapSize, height - (20 + this.gapSize));
        this.top = this.gapLocation - this.gapSize / 2;
        this.bottom = this.gapLocation + this.gapSize / 2;
        this.x = 500 + 250 * i;
        this.speed = -1;
        this.w = 30
        this.passed = false;
        this.runCheck = true;
    }

    showTop() {
        fill(0, 0, 200);
        rect(this.x, 0, this.w, this.top);
    }

    showBottom() {
        fill(0, 0, 200);
        rect(this.x, this.bottom, this.w, height - this.bottom);
    }

    update() {
        this.x += this.speed;
        if (this.runCheck)
            this.passed = (bird.x - bird.r) > (this.x + this.w);
    }

    birdHit(bird) {
        if ((bird.x + bird.r) >= this.x && (bird.x - bird.r) <= (this.x + this.w)) {
            if ((bird.y - bird.r) <= this.top || (bird.y + bird.r) >= this.bottom)
                return true;
        }
        return false;
    }

    count(bird, i) {
    }

}