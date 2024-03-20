import { Ball } from './Ball';
import { useEffect, useRef, useState } from 'react';
import { initializaGame, moveBalls, handleCollisions } from './GameLogic';
import { drawBall } from '../../utils/DrawUtils';
import BallMenu from '../BallMenu/BallMenu';

const GameCanvas: React.FC = () => {
	const [selectedBall, setSelectedBall] = useState<Ball | null>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const context = canvas.getContext('2d');
		if (!context) return;

		const balls = initializaGame();

		const handleMouseMove = (event: MouseEvent) => {
			const rect = canvas.getBoundingClientRect();
			const mouseX = event.clientX - rect.left;
			const mouseY = event.clientY - rect.top;

			balls.forEach(ball => {
				if (isMouseInBall(mouseX, mouseY, ball)) {
					setSelectedBall(ball);
				}
				pushBallOnHover(mouseX, mouseY, ball);
			});
		};

		canvas.addEventListener('mousemove', handleMouseMove);

		const updateGame = () => {
			context.clearRect(0, 0, canvas.width, canvas.height);

			moveBalls(balls);
			handleCollisions(balls, canvas);

			balls.forEach(ball => drawBall(context, ball));

			requestAnimationFrame(updateGame);
		};

		updateGame();

		return () => {
			canvas.removeEventListener('mousemove', handleMouseMove);
		};
	}, []);

	const isMouseInBall = (mouseX: number, mouseY: number, ball: Ball) => {
		const dx = mouseX - ball.x;
		const dy = mouseY - ball.y;
		return Math.sqrt(dx * dx + dy * dy) < ball.radius;
	};

	const handleColorChange = (color: string) => {
		if (selectedBall) {
			selectedBall.color = color;
			setSelectedBall(null);
		}
	};

	const pushBallOnHover = (mouseX: number, mouseY: number, ball: Ball) => {
		const dx = mouseX - ball.x;
		const dy = mouseY - ball.y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < ball.radius) {
			ball.dx += dx / distance;
			ball.dy += dy / distance;
		}
	};

	return (
		<>
			<canvas
				className='canvas'
				ref={canvasRef}
				width={300}
				height={500}
			/>
			{selectedBall && (
				<BallMenu
					selectedColor={selectedBall.color}
					onColorChange={handleColorChange}
					colorOptions={['yellow', 'red', 'blue', 'black', 'pink']}
				/>
			)}
		</>
	);
};

export default GameCanvas;
