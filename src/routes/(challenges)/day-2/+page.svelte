<script lang="ts">
	import SadSanta from '$lib/assets/day-2/sad-santa.avif';
	import { cookieGameStore } from '$lib/stores/day-2';
	import { GameState } from '$lib/types/day-2';
	import { cn } from '$lib/utils';
	import { slide } from 'svelte/transition';
	import type { PageData } from './$types';
	import Canvas from './(components)/Canvas.svelte';
	import Stash from './(components)/Stash.svelte';

	const game = cookieGameStore();
	$: ({ state } = $game);
	export let data: PageData;
</script>

<div class="space-y-2">
	<h1 class="font-christmas">{data.challenge.name}</h1>
	<p>
		<span class="text-[rgb(255,0,0)] font-bold">You</span>
		are Santa, and you are hungry. Eat the
		<span class="text-[rgb(255,150,0)] font-bold">cookies</span>, but don't eat yourself!
	</p>
</div>

<Stash />

{#if state === GameState.Stopped}
	<div in:slide class="my-8">
		<h1 class="text-center my-4">
			<span>Oh no!</span>
			<span class="text-destructive">SANTA DIED</span>
		</h1>
		<img src={SadSanta} alt="Sad santa" class="max-h-36 mx-auto object-cover" />
	</div>
{/if}

<p class="text-muted-foreground my-1 text-right">
	{#if $game.state === GameState.Paused}
		<b>Space</b> / <b>arrows</b> to unpause,
	{:else if $game.state === GameState.Playing}
		<b>Space</b> to pause,
	{/if}
	<b>R</b> to restart
</p>
<div
	class={cn(
		'w-full border rounded-md overflow-hidden',
		'h-[400px]'
		// `h-[calc(${tileSize * tileCount.y}-${(tileSize * tileCount.y) % tileSize}px]`
	)}
>
	<Canvas />
</div>
<p class="text-muted-foreground my-1 text-right">
	<b>←</b> <b>↑</b> <b>→</b> <b>↓</b> to move
</p>
