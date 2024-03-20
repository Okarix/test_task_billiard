import { Ball } from '../components/GameCanvas/Ball';

export const drawBall = (ctx: CanvasRenderingContext2D, ball: Ball) => {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
	ctx.fillStyle = ball.color;
	ctx.fill();
	ctx.closePath();
};
