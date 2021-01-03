class Blocks {

    constructor(i) {
        this.gapSize = 120;
        this.gapLocation = random(20 + this.gapSize, height - (20 + this.gapSize));
        this.top = this.gapLocation - this.gapSize / 2;
        this.bottom = this.gapLocation + this.gapSize / 2;
        this.x = 400 + 200 * i;
        this.speed = -2;
        this.w = 40;
        this.passed = false;
        this.runCheck = true;
        this.horizontalDivs = 5
        this.windowSize = this.w / this.horizontalDivs;
        this.windowGap = 12;
        this.dist = this.windowSize * 2 + this.windowGap;
        this.windowsTop = floor(this.top / this.dist);
        this.windowsBottom = floor((height - this.bottom) / this.dist);
        this.colour = random(30, 60);
    }

    showTop() {
        fill(this.colour);
        rect(this.x, 0, this.w, this.top);
        for (let i = 0; i < this.windowsTop; i++) {
            fill(255, 255, 0);
            rect(
                this.x + this.windowSize,
                this.windowGap + (this.windowGap + this.windowSize * 2) * i,
                this.windowSize,
                this.windowSize * 2
            );
            rect(
                this.x + this.w - 2 * this.windowSize,
                this.windowGap + (this.windowGap + this.windowSize * 2) * i,
                this.windowSize,
                this.windowSize * 2
            );
        }
        // image(tubeImg, this.x, 0, this.w, this.top);
    }

    showBottom() {
        fill(this.colour);
        rect(this.x, this.bottom, this.w, height - this.bottom);
        for (let i = 0; i < this.windowsBottom; i++) {
            fill(255, 255, 0);
            rect(
                this.x + this.windowSize,
                this.bottom + this.windowGap + i * (this.windowGap + this.windowSize * 2),
                this.windowSize,
                this.windowSize * 2
            );
            rect(
                this.x + this.windowSize * ((this.horizontalDivs + 1) / 2),
                this.bottom + this.windowGap + i * (this.windowGap + this.windowSize * 2),
                this.windowSize,
                this.windowSize * 2
            );
        }
        // image(tubeImg, this.x, this.bottom, this.w, height - this.bottom);
    }

    update() {
        this.x += this.speed;
        if (this.runCheck)
            this.passed = (bird.x - bird.r1) > (this.x - this.w);
    }

    birdHit(bird) {
        if ((bird.x + bird.r1) >= this.x && (bird.x - bird.r1) <= (this.x + this.w)) {
            if ((bird.y - bird.r2) <= this.top || (bird.y + bird.r2) >= this.bottom)
                return true;
        }
        return false;
    }

    offScreen() {
        return (this.x + this.w < 0);
    }

}