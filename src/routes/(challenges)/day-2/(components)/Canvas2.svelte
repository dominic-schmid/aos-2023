<script lang="ts">
	import { cookieGameStore } from '$lib/stores/day-2';
	import { GameState } from '$lib/types/day-2';
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let observer: ResizeObserver;
	$: canvas && observer && observer.observe(canvas);

	const game = cookieGameStore();

	$: {
		if (canvas) {
			$game.tileCount = {
				x: canvas.clientWidth / $game.tileSize,
				y: canvas.clientHeight / $game.tileSize
			};
		}
	}

	// Generate a random position on the board
	const ran = {
		x: () => Math.floor(Math.random() * $game.tileCount.x),
		y: () => Math.floor(Math.random() * $game.tileCount.y)
	};

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

	function draw() {
		if (!canvas) return; //  Shouldn't happen, but just in case

		drawBoard();
		drawSnake();
		drawCookie();

		if ($game.state === GameState.Playing) {
			moveSnake();
			detectCollisions();
		}

		setTimeout(draw, 1000 / $game.speed); //update screen 7 times a second
	}

	function drawBoard() {
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
	}

	function drawSnake() {
		// Draw "old" tail
		$game.snake.tail.forEach((pos) => {
			ctx.fillStyle = 'green';
			ctx.fillRect(pos.x * $game.tileSize, pos.y * $game.tileSize, $game.tileSize, $game.tileSize);
		});

		if ($game.state === GameState.Playing && $game.snake.tail.length > 0) {
			// Draw "new" tail and remove last item
			$game.snake.tail = [
				{ x: $game.snake.head.x, y: $game.snake.head.y },
				...$game.snake.tail.slice(0, -1)
			];
		}

		ctx.fillStyle = 'rgb(255,0,0)';
		ctx.fillRect(
			$game.snake.head.x * $game.tileSize,
			$game.snake.head.y * $game.tileSize,
			$game.tileSize,
			$game.tileSize
		);
	}

	function drawCookie() {
		ctx.fillStyle = 'rgb(255,150,0)';
		ctx.fillRect(
			$game.cookie.x * $game.tileSize,
			$game.cookie.y * $game.tileSize,
			$game.tileSize,
			$game.tileSize
		);
	}

	function moveSnake() {
		$game.snake.head.x = $game.snake.head.x + $game.snake.speed.x;
		$game.snake.head.y = $game.snake.head.y + $game.snake.speed.y;
	}

	function detectCollisions() {
		if (
			($game.snake.speed.x === -1 && $game.snake.head.x <= 0) ||
			($game.snake.speed.x === 1 && $game.snake.head.x >= $game.tileCount.x - 1) ||
			($game.snake.speed.y === -1 && $game.snake.head.y <= 0) ||
			($game.snake.speed.y === 1 && $game.snake.head.y >= $game.tileCount.y - 1)
		) {
			return game.die();
		}

		// Check if $game.snake head collides with any of the tail
		$game.snake.tail.forEach((pos) => {
			if (pos.x == $game.snake.head.x && pos.y == $game.snake.head.y) {
				return game.die();
			}
		});

		// Check if $game.snake head collides with cookie
		if ($game.cookie.x == $game.snake.head.x && $game.cookie.y == $game.snake.head.y) {
			$game.snake.tail.push({ x: $game.snake.head.x, y: $game.snake.head.y });
			$game.cookie.x = ran.x();
			$game.cookie.y = ran.y();
		}
	}

	function keyDown(e: KeyboardEvent) {
		switch (e.key) {
			case ' ':
				if ($game.state === GameState.Paused) $game.state = GameState.Playing;
				else if ($game.state === GameState.Playing) $game.state = GameState.Paused;
				break;
			case 'ArrowRight':
				if ($game.snake.speed.x == -1) break; //If the $game.snake is moving left, it can't move right.
				if ($game.state === GameState.Paused) $game.state = GameState.Playing;
				$game.snake.speed.x = 1;
				$game.snake.speed.y = 0;
				break;
			case 'ArrowLeft':
				if ($game.snake.speed.x == 1) break; //If the $game.snake is moving right, it can't move left.
				if ($game.state === GameState.Paused) $game.state = GameState.Playing;
				$game.snake.speed.x = -1;
				$game.snake.speed.y = 0;
				break;
			case 'ArrowUp':
				if ($game.snake.speed.y == 1) break; //If the $game.snake is moving down, it can't move up.
				if ($game.state === GameState.Paused) $game.state = GameState.Playing;
				$game.snake.speed.x = 0;
				$game.snake.speed.y = -1;
				break;
			case 'ArrowDown':
				if ($game.snake.speed.y == -1) break; //If the $game.snake is moving up, it can't move down.
				if ($game.state === GameState.Paused) $game.state = GameState.Playing;
				$game.snake.speed.x = 0;
				$game.snake.speed.y = 1;
				break;
			case 'r':
				game.restart({
					cookie: { x: ran.x(), y: ran.y() },
					snake: {
						head: { x: ran.x(), y: ran.y() },
						tail: [],
						speed: { x: 0, y: 0 }
					}
				});
				break;
		}
		// If any arrow key pressed, start the game Prevent moving the page scroller
		if ([' ', 'ArrowRight', 'ArrowLeft', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
			e.preventDefault();
		}
	}
</script>

<svelte:window on:keydown={keyDown} />

<canvas bind:this={canvas} class="w-full h-full" />
