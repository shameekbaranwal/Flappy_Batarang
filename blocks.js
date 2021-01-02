class Blocks {

    constructor(i) {
        this.gapSize = 100;
        this.gapLocation = random(20 + this.gapSize, height - (20 + this.gapSize));
        this.top = this.gapLocation - this.gapSize / 2;
        this.bottom = this.gapLocation + this.gapSize / 2;
        this.x = width + width/2 * i;
        this.speed = -2;
        this.w = 30
        this.passed = false;
        this.runCheck = true;
        this.headHeight = 30;
        this.headWidth = 6;
    }

    showTop() {
        fill(0, 200, 0);
        rect(this.x, 0, this.w, this.top);
        fill(0, 195, 0);
        rect(this.x - this.headWidth/2, this.top - this.headHeight, this.w + this.headWidth, this.headHeight);
    }

    showBottom() {
        fill(0, 200, 0);
        rect(this.x, this.bottom, this.w, height - this.bottom);
        fill(0, 195, 0);
        rect(this.x - this.headWidth/2, this.bottom, this.w + this.headWidth, this.headHeight);
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

    offScreen() {
        return (this.x + this.w < 0);
    }

}