<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut, cubicIn } from 'svelte/easing';
	import Metadata from '$lib/components/challenges/Metadata.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pause, Play } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import Canvas from './(components)/Canvas.svelte';
	import { cookies } from '$lib/stores/day-2';
	import { GameState, type Board, type Pos } from '$lib/types/day-2';
	import CookieImg from '$lib/assets/day-2/cookie.png';

	export let data: PageData;
	let cookie: Pos;

	let gameState = GameState.Playing;
	let board: Board;
	$: board;

	let shouldRestart = false;

	$: cookieArray = Array.from(Array($cookies)).keys();

	const pause = () => (gameState = GameState.Paused);
	const unpause = () => (gameState = GameState.Playing);
	const restart = () => (shouldRestart = true);
</script>

<Metadata challenge={data.challenge} />

<div class="flex items-center justify-between gap-x-8">
	<h1>Cookie count: {$cookies}</h1>
	<h3 class="text-destructive" class:hidden={gameState !== GameState.Stopped}>Santa died!</h3>
	<div>
		{#if gameState === GameState.Paused}
			<Button size="icon" on:click={unpause}>
				<Play />
			</Button>
		{:else if gameState === GameState.Playing}
			<Button size="icon" on:click={pause}>
				<Pause />
			</Button>
		{:else if gameState === GameState.Stopped}
			<Button variant="outline" on:click={restart} disabled={gameState !== GameState.Stopped}>
				Restart game
			</Button>
		{/if}
	</div>
</div>
<p class="text-muted-foreground mb-8"><b>Space</b>: pause | <b>R</b>: restart</p>

{#if board}
	<div style="width: {board.w}">
		<div class="flex my-4 bg-card border rounded-md shadow-md p-4 -space-x-3 flex-wrap">
			<h4 class="mr-6">Stash</h4>
			{#each cookieArray as _, i (i)}
				<img
					in:fly={{ y: 100, x: cookie.x, duration: 1000 }}
					out:fly={{ y: Math.random() * 100, duration: 500, easing: quintOut }}
					src={CookieImg}
					alt="a cookie"
					class="animate-[spin_5s_infinite_linear]"
					width="30"
					height="30"
				/>
			{/each}
		</div>
	</div>
{/if}

<Canvas bind:gameState bind:shouldRestart bind:cookie bind:board />
