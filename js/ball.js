class Ball {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.vx = Math.random() * 4 - 2; // Random horizontal velocity
		this.vy = 0; // Initial vertical velocity
		this.radius = Math.random() * 20 + 10; // Random radius between 10 and 30
		this.color = `hsl(${Math.random() * 360}, 70%, 50%)`;
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = this.color;
		ctx.fill();
		ctx.closePath();
	}
	
	update(canvas, gravity, bounce, friction) {
		this.vy += gravity; // Apply gravity
		this.x += this.vx;
		this.y += this.vy;
		
		// Bounce off floor
		if (this.y + this.radius > canvas.height) {
			this.y = canvas.height - this.radius;
			this.vy *= -bounce;
			this.vx *= friction;
		}
		
		// Bounce off walls
		if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
			this.vx *= -bounce;
			this.x = Math.max(this.radius, Math.min(canvas.width - this.radius, this.x));
		}
		
		// Stop small movements
		if (Math.abs(this.vy) < 0.1 && this.y + this.radius >= canvas.height - 0.1) {
			this.vy = 0;
			this.vx *= friction;
			if (Math.abs(this.vx) < 0.01) this.vx = 0;
			this.y = canvas.height - this.radius;
		}
	}
}