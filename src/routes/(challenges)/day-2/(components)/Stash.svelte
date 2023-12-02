<script lang="ts">
	import { cookieGameStore } from '$lib/stores/day-2';
	import { fly } from 'svelte/transition';
	import CookieImg from '$lib/assets/day-2/cookie.png';
	import { quintOut } from 'svelte/easing';

	const game = cookieGameStore();
	$: ({ cookie, snake } = $game);

	$: cookieArray = Array.from(Array(snake.tail.length)).keys();
</script>

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
