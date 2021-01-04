class Bird {

    constructor() {
        this.x = 50;
        this.y = width / 2;
        this.r1 = 20;
        this.r2 = 20;
        this.gravity = 0.7;
        this.speed = 0;
        this.drag = 0.98;
        this.lift = -8;
        this.speedLimit = 20;
        this.angle = 0;
    }

    show() {
        //absurd parameters to enhance symbol
        fill(0);
        push();
        translate(this.x, this.y);
        stroke(255);
        strokeWeight(1);
        // rect(-this.r1, -this.r2, this.r1 * 2, this.r2 * 2);
        push();
        this.angle = (frameCount * 8) % 360;
        rotate(this.angle);
        // ellipse(1, 0, this.r * 2 + 2, this.r * 2);
        image(birdImg, -this.r1, -this.r2, this.r1 * 2, this.r2 * 2);
        pop();
        pop();
    }

    update() {
        this.speed += this.gravity;
        this.y += this.speed;
        this.speed *= this.drag;
    }

    click() {
        this.speed = this.lift;
    }

    hitBottom() {
        if (this.y >= height - this.r2) {
            this.y = height - this.r2;
            gameOver();
            hitSFX.play();
            // this.speed = -5;
        }
    }


    hitTop() {
        if (this.y <= 0 + this.r2) {
            this.speed = 5;
            this.y = this.r2 + 10;
        }
    }
}