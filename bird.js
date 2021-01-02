class Bird {

    constructor() {
        this.x = 50;
        this.y = width / 2;
        this.r = 15;
        this.gravity = 0.7;
        this.speed = 0;
        this.drag = 0.98;
        this.lift = -8;
        this.speedLimit = 20;
    }

    show() {
        //absurd parameters to enhance symbol
        fill(0);
        push();
        translate(this.x, this.y);
        stroke(0);
        strokeWeight(1);
        ellipse(1, 0, this.r * 2 + 2, this.r * 2);
        image(birdImg, -this.r, -this.r, this.r * 2 + 2, this.r * 2);
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
        if (this.y >= height - this.r) {
            this.y = height - this.r - 1;
            // this.speed = -5;
        }
    }


    hitTop() {
        if (this.y <= 0 + this.r) {
            this.speed = 5;
            this.y = this.r + 10;
        }
    }
}