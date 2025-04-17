function handleCollisions(balls, blackBalls, bounce) {
	// Normal ball collisions
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			const ball1 = balls[i];
			const ball2 = balls[j];
			const dx = ball2.x - ball1.x;
			const dy = ball2.y - ball1.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = ball1.radius + ball2.radius;
			
			if (distance < minDistance) {
				const angle = Math.atan2(dy, dx);
				const overlap = minDistance - distance;
				const pushX = (overlap * Math.cos(angle)) / 2;
				const pushY = (overlap * Math.sin(angle)) / 2;
				
				ball1.x -= pushX;
				ball1.y -= pushY;
				ball2.x += pushX;
				ball2.y += pushY;
				
				ball1.y = Math.min(ball1.y, canvas.height - ball1.radius);
				ball2.y = Math.min(ball2.y, canvas.height - ball2.radius);
				
				const tempVx = ball1.vx;
				const tempVy = ball1.vy;
				ball1.vx = ball2.vx * bounce;
				ball1.vy = ball2.vy * bounce;
				ball2.vx = tempVx * bounce;
				ball2.vy = tempVy * bounce;
			}
		}
	}
	
	// Black ball vs normal ball collisions
	for (let i = 0; i < blackBalls.length; i++) {
		const blackBall = blackBalls[i];
		for (let j = 0; j < balls.length; j++) {
			const ball = balls[j];
			const dx = ball.x - blackBall.x;
			const dy = ball.y - blackBall.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			const minDistance = blackBall.radius + ball.radius;
			
			if (distance < minDistance) {
				// Only push normal ball, black ball unaffected
				const angle = Math.atan2(dy, dx);
				const overlap = minDistance - distance;
				ball.x += overlap * Math.cos(angle);
				ball.y += overlap * Math.sin(angle);
				ball.y = Math.min(ball.y, canvas.height - ball.radius);
				
				// Transfer some velocity to normal ball
				ball.vx += blackBall.vx * 0.5 * bounce;
				ball.vy += blackBall.vy * 0.5 * bounce;
			}
		}
	}
}