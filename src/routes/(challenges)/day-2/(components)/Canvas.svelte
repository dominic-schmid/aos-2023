<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import { cookies } from '$lib/stores/day-2';
	import type { Pos, Snake } from '$lib/types/day-2';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | undefined = undefined;
	let ctx: CanvasRenderingContext2D;

	enum GameState {
		Paused, // Game has started but not yet playing
		Playing,
		Stopped
	}

	export let gameState = GameState.Paused;

	const board = { w: 624, h: 400 } as const;

	const tileSize = 16 as const;
	const tileCount: Pos = {
		x: board.w / tileSize,
		y: board.h / tileSize
	};

	const speed = 15 as const; // Refresh rate per second

	let snake: Snake = {
		head: { x: 0, y: 0 },
		tail: [],
		speed: { x: 0, y: 0 }
	};

	let cookie: Pos = { x: 0, y: 0 };

	// Bind cookies store to snake length
	$cookies = snake.tail.length;

	onMount(() => {
		if (canvas) {
			const context = canvas.getContext('2d');
			if (!context) return;
			ctx = context;
			document.body.addEventListener('keydown', keyDown);

			restart();
			draw();
		}
	});

	function clearBoard() {
		if (!canvas) return;
		ctx.fillStyle = 'red';
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}

	function draw() {
		clearBoard();
		drawSnake();
		drawCookie();
		if (gameState === GameState.Playing) {
			changeSnakePosition();
			collisionDetection();
		}

		setTimeout(draw, 1000 / speed); //update screen 7 times a second
	}

	function drawSnake() {
		if (!canvas) return;
		// Draw "old" tail
		snake.tail.forEach((pos) => {
			ctx.fillStyle = 'green';
			ctx.fillRect(pos.x * tileSize, pos.y * tileSize, tileSize, tileSize);
		});

		if (gameState === GameState.Playing && snake.tail.length > 0) {
			// Draw "new" tail and remove last item
			snake.tail = [{ x: snake.head.x, y: snake.head.y }, ...snake.tail.slice(0, -1)];
		}

		ctx.fillStyle = 'orange';
		ctx.fillRect(snake.head.x * tileSize, snake.head.y * tileSize, tileSize, tileSize);
	}

	function drawCookie() {
		if (!canvas) return;
		ctx.fillStyle = 'blue';
		ctx.fillRect(cookie.x * tileSize, cookie.y * tileSize, tileSize, tileSize);
	}

	function changeSnakePosition() {
		snake.head.x = snake.head.x + snake.speed.x;
		snake.head.y = snake.head.y + snake.speed.y;
	}

	function collisionDetection() {
		if (
			(snake.speed.x === -1 && snake.head.x <= 0) ||
			(snake.speed.x === 1 && snake.head.x >= tileCount.x - 1) ||
			(snake.speed.y === -1 && snake.head.y <= 0) ||
			(snake.speed.y === 1 && snake.head.y >= tileCount.y - 1)
		) {
			return die();
		}

		// Check if snake head collides with any of the tail
		snake.tail.forEach((pos) => {
			if (pos.x == snake.head.x && pos.y == snake.head.y) {
				return die();
			}
		});

		// Check if snake head collides with cookie
		if (cookie.x == snake.head.x && cookie.y == snake.head.y) {
			snake.tail.push({ x: snake.head.x, y: snake.head.y });
			cookie.x = ranPos('x');
			cookie.y = ranPos('y');
		}
	}

	function keyDown(e: KeyboardEvent) {
		// If any arrow key pressed, start the game
		if (
			['ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.code) &&
			gameState === GameState.Paused
		) {
			gameState = GameState.Playing;
		}

		if (e.key == 'ArrowRight') {
			if (snake.speed.x == -1) return; //If the snake is moving left, it can't move right.
			snake.speed.x = 1;
			snake.speed.y = 0;
		}
		if (e.key == 'ArrowLeft') {
			if (snake.speed.x == 1) return; //If the snake is moving right, it can't move left.
			snake.speed.x = -1;
			snake.speed.y = 0;
		}
		if (e.key == 'ArrowUp') {
			if (snake.speed.y == 1) return; //If the snake is moving down, it can't move up.
			snake.speed.x = 0;
			snake.speed.y = -1;
		}
		if (e.key == 'ArrowDown') {
			if (snake.speed.y == -1) return; //If the snake is moving up, it can't move down.
			snake.speed.x = 0;
			snake.speed.y = 1;
		}
		if (e.key == ' ') {
			if (gameState === GameState.Paused) {
				gameState = GameState.Playing;
			} else if (gameState === GameState.Playing) {
				gameState = GameState.Paused;
			} else {
				restart();
			}
		}
	}

	function die() {
		gameState = GameState.Stopped;
	}

	function restart() {
		gameState = GameState.Paused;
		snake = {
			head: { x: ranPos('x'), y: ranPos('y') },
			tail: [],
			speed: { x: 0, y: 0 }
		};
		cookie = { x: ranPos('x'), y: ranPos('y') };
	}

	// Generate a random position on the board
	const ranPos = (type: 'x' | 'y') => Math.floor(Math.random() * tileCount[type]);
</script>

<div class="flex justify-evenly gap-x-8">
	<canvas bind:this={canvas} id="canvas" width={board.w} height={board.h} />
	<div class="space-y-4">
		{#if gameState === GameState.Stopped}
			<h3 class="text-destructive">Santa died!</h3>
		{/if}

		<Button variant="secondary" on:click={restart} disabled={gameState !== GameState.Stopped}>
			Restart
		</Button>

		<ul>
			<li>Board: {board.w} * {board.h} pixels</li>
			<li>Snake length: {snake.tail.length}</li>
		</ul>
	</div>
</div>
