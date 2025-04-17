export class Obstacle {
	constructor(canvas, laneCount = 6, laneIndex = 0) {
		this.canvas = canvas;
		this.laneCount = laneCount;
		this.laneWidth = canvas.width / laneCount;
		
		this.width = 40;
		this.height = 80;
		
		this.laneIndex = laneIndex;
		this.x = this.getLaneX(this.laneIndex);
		this.targetX = this.x; // Tujuan perpindahan
		this.y = -this.height;
		
		this.baseSpeed = 3 + Math.random() * 1;
		this.speed = this.baseSpeed;
		
		this.color = this.getRandomColor();
		
		this.canChangeLane = true;
		this.changeCooldown = 1000;
		this.lastLaneChange = 0;
	}
	
	update(multiplier, isBossMode, currentTime = Date.now()) {
		this.y += this.speed * multiplier;
		
		// Smooth lane change
		const lerpFactor = 0.1; // Semakin kecil, semakin halus
		this.x += (this.targetX - this.x) * lerpFactor;
		
		if (isBossMode && currentTime - this.lastLaneChange > this.changeCooldown) {
			const moveDir = Math.random() < 0.5 ? -1 : 1;
			const newLane = this.laneIndex + moveDir;
			
			if (newLane >= 0 && newLane < this.laneCount) {
				this.laneIndex = newLane;
				this.targetX = this.getLaneX(this.laneIndex); // Pindah targetX, bukan langsung x
				this.lastLaneChange = currentTime;
			}
		}
	}
	
	getLaneX(laneIndex) {
		return laneIndex * this.laneWidth + (this.laneWidth - this.width) / 2;
	}
	
	draw(ctx) {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
	
	offScreen() {
		return this.y > this.canvas.height;
	}
	
	getRandomColor() {
		const colors = ['red', 'orange', 'magenta', 'cyan'];
		return colors[Math.floor(Math.random() * colors.length)];
	}
}