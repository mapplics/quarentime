export class Particle {

    public x: any;
    public y: any;
    public radius: any;
    public originalRadius: any;
    public color: any;
    public mass: any;
    public velocity: any;
    public collision: any;

    constructor(X, Y, Speed, Radius, Color) {
        this.x = X;
        this.y = Y;
        this.radius = Radius;
        this.originalRadius = Radius;
        this.color = Color;
        this.mass = 1;
        this.velocity = {
            x: (Math.random() - 0.5) * Speed,
            y: (Math.random() - 0.5) * Speed
        };
        this.collision = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            2 * Math.PI
        );
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update(ctx, widthWindow, heightWindow, particleArray) {
        if ( this.x + this.radius > widthWindow || this.x - this.radius < 0 ) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.y + this.radius > heightWindow || this.y - this.radius < 0 ) {
            this.velocity.y = -this.velocity.y;
        }

        for (let i = 0 ; i < particleArray.length ; i++) {
            if (this === particleArray[i]) {
                continue;
            }
            if (this.distance(this.x, this.y, particleArray[i].x, particleArray[i].y) - this.radius - particleArray[i].radius < 0) {
                this.resolveCollision(particleArray[i]);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        this.draw(ctx);
    }

    resolveCollision(otherParticle) {
        const xVelocityDiff = this.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = this.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - this.x;
        const yDist = otherParticle.y - this.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - this.y, otherParticle.x - this.x);

            // Store mass in let for better readability in collision equation
            const m1 = this.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = this.rotate(this.velocity, angle);
            const u2 = this.rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = {x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
            const v2 = {x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

            // Final velocity after rotating axis back to original location
            const vFinal1 = this.rotate(v1, -angle);
            const vFinal2 = this.rotate(v2, -angle);



            // Swap particle velocities for realistic bounce effect
            this.velocity.x = vFinal1.x;
            this.velocity.y = vFinal1.y;

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;

            if (this.color === '#AFC5C9') {
                this.color = otherParticle.color;
            } else if (this.color === '#F76161' && otherParticle.color !== '#C18EBD') {
                otherParticle.color = this.color;
            } else if (this.color !== '#C18EBD' && otherParticle.color === '#F76161') {
                this.color = otherParticle.color;
            } else if (this.color === '#F76161' && otherParticle.color === '#C18EBD') {
                this.color = otherParticle.color;
            } else if (otherParticle.color === '#F76161' && this.color === '#C18EBD') {
                otherParticle.color = this.color;
            }
        }
    }

    distance(x0, y0, x1, y1) {
        const distanceX = x1 - x0;
        const distanceY = y1 - y0;
        return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    }

    rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };
        return rotatedVelocities;
    }
}


export class ParticlesMoving {

    private readonly ctx = null;
    private  minRadiusParticle = 10;
    private  maxRadiusParticle = 10;
    private  speed = 3;
    private  density = 140;
    private  particleArray = [];
    private  widthWindow = window.innerWidth;
    private  heightWindow = window.innerHeight;
    private  longerSide;
    private  numParticules;
    private canvas: HTMLCanvasElement;


    constructor(canvas: HTMLCanvasElement) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
    }

    draw(maxHeight) {
        this.widthWindow = window.innerWidth;
        this.heightWindow = window.innerHeight;
        this.heightWindow = this.heightWindow * maxHeight / 100;
        this.canvas.setAttribute('width', this.widthWindow.toString());
        this.canvas.setAttribute('height', this.heightWindow.toString());
        this.longerSide = Math.max(this.widthWindow, this.heightWindow);
        this.numParticules = Math.round(((((this.widthWindow * this.heightWindow) / this.longerSide) / 100) * this.density) / this.maxRadiusParticle);
        this.particleArray = [];
        for (let i = 0; i <= this.numParticules; i++) {
            const randomRadius = Math.floor(this.minRadiusParticle);
            // let RandomColor = constColors[ Math.floor(Math.random() * constColors.length) ];
            let x = (Math.random() * (this.widthWindow - randomRadius * 2)) + randomRadius;
            let y = (Math.random() * (this.heightWindow - randomRadius * 2)) + randomRadius;
            if (i !== 0) {
                for (let j = 0; j < this.particleArray.length; j++) {
                    if (this.distance(x, y, this.particleArray[j].x, this.particleArray[j].y) - this.particleArray[j].radius - randomRadius < 0) {
                        x = (Math.random() * (this.widthWindow - randomRadius * 2)) + randomRadius;
                        y = (Math.random() * (this.heightWindow - randomRadius * 2)) + randomRadius;
                        j = -1;
                    }
                }
            }
            let particle = new Particle(x, y, this.speed, randomRadius, '#AFC5C9');
            this.particleArray.push(particle);
            if (i === this.numParticules) {
                particle = new Particle(x, y, this.speed, randomRadius, '#F76161');
                this.particleArray.push(particle);
            }
        }
        window.requestAnimationFrame(() => this.animate());
    }


    animate() {
        this.ctx.clearRect(0, 0, this.widthWindow, this.heightWindow);
        for (let i = 0 ; i < this.particleArray.length ; i++) {
            this.particleArray[i].update(this.ctx, this.widthWindow, this.heightWindow, this.particleArray);
            if(this.particleArray.filter(x => x.color === '#F76161').length === (this.particleArray.length)) {
                this.particleArray[0].color = '#C18EBD';
            }
            if(this.particleArray.filter(x => x.color === '#C18EBD').length === (this.particleArray.length)) {
                setTimeout(() => {
                    this.reinit();
                }, 2000);
            }
        }
        window.requestAnimationFrame(() => this.animate());
    }

    distance(x0, y0, x1, y1) {
        const distanceX = x1 - x0;
        const distanceY = y1 - y0;

        return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
    }

    reinit(): void {
        this.particleArray.forEach(x => x.color = '#AFC5C9');
        this.particleArray[0].color = '#F76161';
    }


}
