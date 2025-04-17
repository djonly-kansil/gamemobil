class Particle {
	constructor(x, y, color, isSmoke = false, isExplosion = false) {
		this.x = x;
		this.y = y;
		this.vx = (Math.random() - 0.5) * (isSmoke ? 5 : isExplosion ? 15 : 10); // Faster for explosion
		this.vy = (Math.random() - 0.5) * (isSmoke ? 5 : isExplosion ? 15 : 10);
		this.radius = isSmoke ? Math.random() * 15 + 10 : isExplosion ? Math.random() * 3 + 2 : Math.random() * 5 + 2; // Small for explosion
		this.color = color;
		this.alpha = 1;
		this.life = isSmoke ? 120 : isExplosion ? 30 : 60; // Short life for explosion
	}
	
	draw(ctx) {
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
		ctx.fillStyle = `${this.color.slice(0, -1)}, ${this.alpha})`;
		ctx.fill();
		ctx.closePath();
	}
	
	update(gravity) {
		this.x += this.vx;
		this.y += this.vy;
		this.vy += gravity * (this.life > 60 ? 0.1 : 0.2); // Lighter gravity for smoke
		this.alpha -= 1 / this.life;
		this.life--;
	}
}