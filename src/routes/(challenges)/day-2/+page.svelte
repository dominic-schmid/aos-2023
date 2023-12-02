<script lang="ts">
	import { slide } from 'svelte/transition';
	import Metadata from '$lib/components/challenges/Metadata.svelte';
	import type { PageData } from './$types';
	import Canvas2 from './(components)/Canvas2.svelte';
	import { cookieGameStore } from '$lib/stores/day-2';
	import { GameState } from '$lib/types/day-2';
	import { cn } from '$lib/utils';
	import SadSanta from '$lib/assets/day-2/sad-santa.avif';
	import Stash from './(components)/Stash.svelte';

	const game = cookieGameStore();
	$: ({ state } = $game);
	export let data: PageData;

	// const pause = () => ($game.state = GameState.Paused);
	// const unpause = () => ($game.state = GameState.Playing);
	// const restart = () => game.restart();
</script>

<Metadata challenge={data.challenge} />

<div class="space-y-2">
	<h1>{data.challenge.name}</h1>
	<p>
		<span class="text-[rgb(255,0,0)] font-bold">You</span>
		are Santa, and you are hungry. Eat the
		<span class="text-[rgb(255,150,0)] font-bold">cookies</span>, but don't eat yourself!
	</p>
	<!-- <div>
		{#if $game.state === GameState.Paused}
			<Button size="icon" on:click={unpause}>
				<Play />
			</Button>
		{:else if $game.state === GameState.Playing}
			<Button size="icon" on:click={pause}>
				<Pause />
			</Button>
		{:else if $game.state === GameState.Stopped}
			<Button variant="outline" on:click={restart} disabled={$game.state !== GameState.Stopped}>
				Restart game
			</Button>
		{/if}
	</div> -->
</div>

<Stash />

{#if state === GameState.Stopped}
	<div in:slide class="my-8">
		<h1 class="text-center my-4">
			<span>Oh no!</span>
			<span class="text-destructive">SANTA DIED</span>
			<!-- <span>of starvation!</span> -->
		</h1>
		<img src={SadSanta} alt="Sad santa" class="max-h-36 mx-auto object-cover" />
	</div>
{/if}

<p class="text-muted-foreground my-1 text-right"><b>Space</b> to pause, <b>R</b> to restart</p>
<div
	class={cn(
		'w-full border rounded-md overflow-hidden',
		'h-[400px]'
		// `h-[calc(${tileSize * tileCount.y}-${(tileSize * tileCount.y) % tileSize}px]`
	)}
>
	<Canvas2 />
</div>
