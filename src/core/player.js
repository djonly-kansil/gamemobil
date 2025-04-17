export class Player {
	constructor(canvas) {
		this.canvas = canvas;
		this.width = 40;
		this.height = 80;
		this.x = canvas.width / 2 - this.width / 2;
		this.y = canvas.height - this.height - 20;
		this.color = this.getRandomColor();
	}
	
	update(touchSide) {
		const boostSpeed = 8; // kecepatan saat disentuh
		
		if (touchSide === 'left') {
			this.x -= boostSpeed;
		} else if (touchSide === 'right') {
			this.x += boostSpeed;
		}
		
		// Batasi agar tetap dalam area canvas
		if (this.x < 0) this.x = 0;
		if (this.x + this.width > this.canvas.width) {
			this.x = this.canvas.width - this.width;
		}
	}
	
	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	getRandomColor() {
		const colors = ['blue', 'green', 'yellow', 'purple'];
		return colors[Math.floor(Math.random() * colors.length)];
	}
}