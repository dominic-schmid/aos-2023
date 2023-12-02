<script lang="ts">
	import { cookies } from '$lib/stores/day-2';
	import { GameState, type Board, type Pos, type Snake } from '$lib/types/day-2';
	import { onMount } from 'svelte';
	import CookieImg from '$lib/assets/day-2/cookie.png';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;

	let observer: ResizeObserver;
	$: canvas && observer && observer.observe(canvas);

	let innerWidth: number;
	let innerHeight: number;

	const speed = 15 as const; // Refresh rate per second
	export let gameState: GameState;

	export let board: Board = { w: 400, h: 400 };
	// $: board = {
	// 	w: innerWidth * 0.7 - ((innerWidth * 0.7) % tileSize),
	// 	h: innerHeight * 0.6 - ((innerHeight * 0.6) % tileSize)
	// };

	const tileSize = 16 as const;
	let tileCount: Pos = { x: 25, y: 25 };
	$: tileCount = {
		x: board.w / tileSize,
		y: board.h / tileSize
	};

	// Generate a random position on the board
	const ranPos = (type: 'x' | 'y') => Math.floor(Math.random() * tileCount[type]);

	let snake: Snake = {
		head: { x: 0, y: 0 },
		tail: [],
		speed: { x: 0, y: 0 }
	};

	// TODO theoretically this could break because the cookie could spawn on the snake sometimes
	export let cookie: Pos = { x: ranPos('x'), y: ranPos('y') };

	$: $cookies = snake.tail.length; // Bind cookies store to snake length

	onMount(() => {
		const context = canvas.getContext('2d')!;
		ctx = context;

		const resize = (canvas: HTMLCanvasElement) => {
			canvas.width = canvas.clientWidth;
			canvas.height = canvas.clientHeight;
		};

		observer = new ResizeObserver(() => canvas && resize(canvas));

		draw();
	});

	function clearBoard() {
		if (!canvas) return;
		ctx.fillStyle = 'black';
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

		ctx.fillStyle = 'red';
		ctx.fillRect(snake.head.x * tileSize, snake.head.y * tileSize, tileSize, tileSize);
	}

	function drawCookie() {
		if (!canvas) return;
		ctx.fillStyle = 'orange';
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
		// If any arrow key pressed, start the game Prevent moving the page scroller
		if (
			['Space', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.code) &&
			gameState === GameState.Paused
		) {
			e.preventDefault();
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
			}
		}
		if (e.key == 'r') {
			restart();
		}
	}

	function die() {
		gameState = GameState.Stopped;
	}

	export let shouldRestart = false;

	function restart() {
		gameState = GameState.Playing;
		snake = {
			head: { x: ranPos('x'), y: ranPos('y') },
			tail: [],
			speed: { x: 0, y: 0 }
		};
		cookie = { x: ranPos('x'), y: ranPos('y') };
	}

	$: shouldRestart && restart(); // hacky way to pass event from parent to child lol
</script>

<svelte:window bind:innerWidth bind:innerHeight on:keydown={keyDown} />

<div class="w-full flex justify-center">
	<canvas bind:this={canvas} id="canvas" class="border rounded-md w-full h-full" />
</div>
