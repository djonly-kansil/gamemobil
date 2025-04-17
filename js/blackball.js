class BlackBall {
	constructor(canvas) {
		this.x = Math.random() * (canvas.width - 60) + 30; // Random x, avoid edges
		this.y = -30; // Start above screen
		this.vx = 0; // No initial horizontal velocity
		this.vy = 0;
		this.radius = 30; // Medium size
		this.color = 'rgba(0, 0, 0, 1)'; // Solid black
		this.gravity = 0.8; // Heavier gravity
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	update(canvas, particles, balls) {
		this.vy += this.gravity;
		this.x += this.vx;
		this.y += this.vy;
		
		// Destroy on hitting floor
		if (this.y + this.radius > canvas.height) {
			// Create explosion with small, fast-fading black particles
			for (let i = 0; i < 50; i++) {
				particles.push(new Particle(this.x, this.y, this.color, false, true));
			}
			// Destroy nearby normal balls
			for (let i = balls.length - 1; i >= 0; i--) {
				const ball = balls[i];
				const dx = ball.x - this.x;
				const dy = ball.y - this.y;
				const distance = Math.sqrt(dx * dx + dy * dy);
				if (distance < this.radius + 100) { // Explosion radius 100px
					balls.splice(i, 1); // Remove nearby ball
				}
			}
			return true; // Signal to remove this black ball
		}
		
		// Bounce off walls
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.vx *= -0.7;
			this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
		}
		
		return false;
	}
}