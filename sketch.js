let particles = [];
let colors = ['#ff004c', '#ff7300', '#ffd700', '#00bfae', '#0061ff'];

function setup() {
    createCanvas(windowWidth, windowHeight).parent('canvas-container');
    noStroke();
    // Start with an explosion in the center
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(width / 2, height / 2));
    }
}

function draw() {
    background(0, 50); // semi-transparent background to create a trailing effect
    for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].update();
        particles[i].display();
        if (particles[i].isOffScreen()) {
            particles.splice(i, 1); // remove particle if it moves off-screen
        }
    }
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.lifespan = 255;
        this.velocity = createVector(random(-5, 5), random(-5, 5));
        this.acceleration = createVector(0, 0.1); // gravity effect
        this.color = random(colors);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.lifespan -= 5; // fade out over time
    }

    display() {
        fill(this.color + Math.floor(this.lifespan).toString(16));
        ellipse(this.x, this.y, 10);
    }

    isOffScreen() {
        return (this.x > width || this.x < 0 || this.y > height || this.y < 0 || this.lifespan <= 0);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
