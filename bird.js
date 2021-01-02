class Bird {

    constructor() {
        this.x = 50;
        this.y = width / 2;
        this.r = 12;
        this.gravity = 0.7;
        this.speed = 0;
        this.drag = 0.98;
        this.lift = -8;
        this.speedLimit = 20;
    }

    show() {
        fill (0, 200, 0);
        circle (this.x, this.y, this.r*2);
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
            // console.log("hit bottom");
            this.y = height - this.r - 1 ;
            // this.speed = -5;
        }
    }

    
    hitTop() {
        if (this.y <= 0 + this.r){
            this.speed = 5;
            this.y = this.r + 10;
        }
    }
}