const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    

    burger.addEventListener('click',()=>{
        //Toggle Nav
        nav.classList.toggle('nav-active');

    //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation 
        burger.classList.toggle('toggle');

    });
}

navSlide();

const particles = [];

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

    const particlesLength = Math.floor(window.innerWidth / 9);

    for(let i = 0; i < particlesLength; i++) {
        particles.push(new Particle());
    }
}

function draw() {
    background(115, 93, 120);
    particles.forEach((p, index) => {
        p.update();
        p.draw();
        p.checkParticles(particles.slice(index));
    });
}

class Particle {
    constructor() {
        //Position
        this.pos = createVector(random(width), random(height));
        
        //Velocity 
        this.vel = createVector(random(-1, 1), random(-1, 1));

        //Size 
        this.size = 5;
    }

    //Update Movement by adding velocity
    update() {
        this.pos.add(this.vel);
        this.edges();
    }

    //Draw single particle
    draw() {
        noStroke();
        fill('rgb(255, 255, 255, 0.5)');
        circle(this.pos.x, this.pos.y, this.size);
    }

    //Detect Edges
    edges() {
        if(this.pos.x < 0 || this.pos.x > width) {
            this.vel.x *= -1;
        }

        if(this.pos.y < 0 || this.pos.y > height) {
            this.vel.y *= -1
        }
    }

    //Connect Particles 
     checkParticles(particles) {
         particles.forEach(particle => {
             const d = dist(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);

             if(d < 120) {
                 stroke('rgba(255, 255, 255, 0.1)');
                 line(this.pos.x, this.pos.y, particle.pos.x, particle.pos.y);
             }
         });
     }
}