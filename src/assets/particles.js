(function($) {

    let myResizeTimer = null;
    let widthWindow = 0;
    let heightWindow = 0;
    const canvas = <HTMLCanvasElement> document.getElementById('canvas');
    let ctx = null;
    let particleArray = [];

    function init() {
        const minRadiusParticle = 14;
        const maxRadiusParticle = 14;
        const speed = 4;
        const density = 100;
        particleArray = [];
        widthWindow = window.innerWidth;
        heightWindow = window.innerHeight;

        const constColors = [
            '#C18EBD',
            '#61C1F7',
            '#F7BA61',
            '#F76161'
        ];

        if (canvas.getContext) {
            ctx = canvas.getContext('2d');
            canvas.setAttribute('width', widthWindow.toString());
            canvas.setAttribute('height', heightWindow.toString());
            const longerSide = Math.max(widthWindow, heightWindow);
            const numParticules = Math.round(((((widthWindow * heightWindow) / longerSide) / 100) * density) / maxRadiusParticle);

            for (let i = 0 ; i < numParticules ; i++) {

                let randomRadius = Math.floor(Math.random() * (maxRadiusParticle - minRadiusParticle ) + minRadiusParticle);
                let RandomColor = constColors[ Math.floor(Math.random() * constColors.length) ];
                let x = (Math.random() * (widthWindow - randomRadius * 2)) + randomRadius;
                let y = (Math.random() * (heightWindow - randomRadius * 2)) + randomRadius;

                if (i !== 0) {
                    for ( let j = 0 ; j < particleArray.length; j++) {
                        //IF PARTICLES ARE TOUCHING WHEN SPAWNING, RECALCULATE
                        if (distance(x, y, particleArray[j].x, particleArray[j].y) - particleArray[j].radius - randomRadius < 0) {
                            x = (Math.random() * (widthWindow - randomRadius * 2)) + randomRadius;
                            y = (Math.random() * (heightWindow - randomRadius * 2)) + randomRadius;
                            j = -1;
                        }
                    }
                }

                let particle = new Particle(x, y, speed, randomRadius, RandomColor);
                particleArray.push(particle);
            }

        }
    }

    function distance(x0, y0, x1, y1) {
        let distanceX = x1 - x0;
        let distanceY = y1 - y0;

        return Math.sqrt(Math.pow(distanceX,2) + Math.pow(distanceY,2))
    }

    function Particle(X, Y, Speed, Radius, Color){
        this.x = X;
        this.y = Y;
        this.radius = Radius;
        this.originalRadius = Radius;
        this.color = Color;
        this.mass = 1;
        this.velocity = {
            x: (Math.random() - 0.5) * Speed,
            y: (Math.random() - 0.5) * Speed
        }
        this.collision = false;

        this.draw = function(){
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

        this.update = function(){
            if( this.x + this.radius > widthWindow || this.x - this.radius < 0 ){
                this.velocity.x = -this.velocity.x;
            }
            if( this.y + this.radius > heightWindow || this.y - this.radius < 0 ){
                this.velocity.y = -this.velocity.y;
            }

            for (let i = 0 ; i < particleArray.length ; i++) {
                if (this === particleArray[i]) continue;
                if (distance(this.x, this.y, particleArray[i].x, particleArray[i].y) - this.radius - particleArray[i].radius < 0){
                    resolveCollision(this, particleArray[i]);
                }
            }

            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.draw();
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0,0, widthWindow, heightWindow);
        for( let i = 0 ; i < particleArray.length ; i++) {
            particleArray[i].update();
        }
    }

    function rotate(velocity, angle) {
        const rotatedVelocities = {
            x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
            y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
        };

        return rotatedVelocities;
    }

    function resolveCollision(particle, otherParticle) {

        const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
        const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

        const xDist = otherParticle.x - particle.x;
        const yDist = otherParticle.y - particle.y;

        // Prevent accidental overlap of particles
        if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

            // Grab angle between the two colliding particles
            const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

            // Store mass in let for better readability in collision equation
            const m1 = particle.mass;
            const m2 = otherParticle.mass;

            // Velocity before equation
            const u1 = rotate(particle.velocity, angle);
            const u2 = rotate(otherParticle.velocity, angle);

            // Velocity after 1d collision equation
            const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
            const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

            // Final velocity after rotating axis back to original location
            const vFinal1 = rotate(v1, -angle);
            const vFinal2 = rotate(v2, -angle);

            // Swap particle velocities for realistic bounce effect
            particle.velocity.x = vFinal1.x;
            particle.velocity.y = vFinal1.y;
            // console.log('particle: ' + JSON.stringify(particle));

            otherParticle.velocity.x = vFinal2.x;
            otherParticle.velocity.y = vFinal2.y;

            particle.color = otherParticle.color;

        }
    }

    window.onresize = function() {
        if (myResizeTimer != null) {
            clearTimeout(myResizeTimer);
        }
        myResizeTimer = setTimeout(init, 100);
    }

    init();
    animate();

})
