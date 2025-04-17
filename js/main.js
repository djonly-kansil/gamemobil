const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Constants
const gravity = 0.5;
const bounce = 0.7;
const friction = 0.99;

// Arrays for objects
const balls = [];
const particles = [];
const blackBalls = [];

// Randomly spawn black balls
function spawnBlackBall() {
	if (Math.random() < 0.002) { // 0.2% chance per frame for longer interval
		blackBalls.push(new BlackBall(canvas));
	}
}

// Handle touch events
canvas.addEventListener('touchstart', (e) => {
	e.preventDefault();
	const touch = e.touches[0];
	const rect = canvas.getBoundingClientRect();
	const x = touch.clientX - rect.left;
	const y = touch.clientY - rect.top;
	
	// Check if touch hits a ball
	for (let i = balls.length - 1; i >= 0; i--) {
		const ball = balls[i];
		const dx = x - ball.x;
		const dy = y - ball.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < ball.radius) {
			for (let j = 0; j < 30; j++) {
				particles.push(new Particle(ball.x, ball.y, ball.color));
			}
			balls.splice(i, 1);
			return;
		}
	}
	
	// Check if touch hits a black ball
	for (let i = blackBalls.length - 1; i >= 0; i--) {
		const blackBall = blackBalls[i];
		const dx = x - blackBall.x;
		const dy = y - blackBall.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < blackBall.radius) {
			for (let j = 0; j < 50; j++) {
				particles.push(new Particle(blackBall.x, blackBall.y, 'rgba(0, 0, 0, 1)', false, true));
			}
			// Destroy nearby normal balls
			for (let j = balls.length - 1; j >= 0; j--) {
				const ball = balls[j];
				const dxBall = ball.x - blackBall.x;
				const dyBall = ball.y - blackBall.y;
				const distanceBall = Math.sqrt(dxBall * dxBall + dyBall * dyBall);
				if (distanceBall < blackBall.radius + 100) {
					balls.splice(j, 1);
				}
			}
			blackBalls.splice(i, 1);
			return;
		}
	}
	
	// Create new ball if no ball was hit
	balls.push(new Ball(x, y));
});

// Animation loop
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	spawnBlackBall();
	handleCollisions(balls, blackBalls, bounce);
	
	// Update and draw balls
	balls.forEach(ball => {
		ball.update(canvas, gravity, bounce, friction);
		ball.draw(ctx);
	});
	
	// Update and draw black balls
	for (let i = blackBalls.length - 1; i >= 0; i--) {
		const blackBall = blackBalls[i];
		if (blackBall.update(canvas, particles, balls)) {
			blackBalls.splice(i, 1); // Remove destroyed black ball
		} else {
			blackBall.draw(ctx);
		}
	}
	
	// Update and draw particles
	for (let i = particles.length - 1; i >= 0; i--) {
		const particle = particles[i];
		particle.update(gravity);
		particle.draw(ctx);
		if (particle.life <= 0) {
			particles.splice(i, 1);
		}
	}
	
	requestAnimationFrame(animate);
}

animate();

// Resize canvas on window resize
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});