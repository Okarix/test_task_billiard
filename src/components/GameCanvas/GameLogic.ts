import { Ball } from './Ball';

export const initializaGame = (): Ball[] => {
	const balls: Ball[] = [
		{ x: 100, y: 100, radius: 15, color: 'blue', dx: 0, dy: 0 },
		{ x: 200, y: 300, radius: 15, color: 'red', dx: 0, dy: 0 },
	];

	return balls;
};

export const moveBalls = (balls: Ball[]) => {
	balls.forEach(ball => {
		ball.x += ball.dx;
		ball.y += ball.dy;
	});
};

export const handleCollisions = (balls: Ball[], canvas: HTMLCanvasElement) => {
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			const ball1 = balls[i];
			const ball2 = balls[j];

			const dx = ball2.x - ball1.x;
			const dy = ball2.y - ball1.y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			if (distance < ball1.radius + ball2.radius) {
				const angle = Math.atan2(dy, dx);

				const overlap = (ball1.radius + ball2.radius - distance) / 2;
				const offsetX = overlap * Math.cos(angle);
				const offsetY = overlap * Math.sin(angle);
				ball1.x -= offsetX;
				ball1.y -= offsetY;
				ball2.x += offsetX;
				ball2.y += offsetY;

				const angle1 = Math.atan2(ball1.dy, ball1.dx);
				const angle2 = Math.atan2(ball2.dy, ball2.dx);
				const magnitude1 = Math.sqrt(ball1.dx * ball1.dx + ball1.dy * ball1.dy);
				const magnitude2 = Math.sqrt(ball2.dx * ball2.dx + ball2.dy * ball2.dy);

				const new_dx1 = magnitude2 * Math.cos(angle2 - angle) * Math.cos(angle) + magnitude1 * Math.sin(angle1 - angle) * Math.cos(angle + Math.PI / 2);
				const new_dy1 = magnitude2 * Math.cos(angle2 - angle) * Math.sin(angle) + magnitude1 * Math.sin(angle1 - angle) * Math.sin(angle + Math.PI / 2);
				const new_dx2 = magnitude1 * Math.cos(angle1 - angle) * Math.cos(angle) + magnitude2 * Math.sin(angle2 - angle) * Math.cos(angle + Math.PI / 2);
				const new_dy2 = magnitude1 * Math.cos(angle1 - angle) * Math.sin(angle) + magnitude2 * Math.sin(angle2 - angle) * Math.sin(angle + Math.PI / 2);

				ball1.dx = new_dx1;
				ball1.dy = new_dy1;
				ball2.dx = new_dx2;
				ball2.dy = new_dy2;
			}
		}
	}

	balls.forEach(ball => {
		ball.x += ball.dx;
		ball.y += ball.dy;

		if (ball.x + ball.radius > canvas.width) {
			ball.x = canvas.width - ball.radius;
			ball.dx = -Math.abs(ball.dx * 0.8);
		} else if (ball.x - ball.radius < 0) {
			ball.x = ball.radius;
			ball.dx = Math.abs(ball.dx * 0.8);
		}

		if (ball.y + ball.radius > canvas.height) {
			ball.y = canvas.height - ball.radius;
			ball.dy = -Math.abs(ball.dy * 0.8);
		} else if (ball.y - ball.radius < 0) {
			ball.y = ball.radius;
			ball.dy = Math.abs(ball.dy * 0.8);
		}
	});
};
