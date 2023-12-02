<script lang="ts">
	import type { Challenge } from '$lib/types';

	export let challenge: Challenge;

	$: title = `Day ${challenge.day}: ${challenge.name} | Advent of Svelte 2023`;
</script>

<svelte:head>
	<title>{title}</title>
	<meta property="og:locale" content="EN_US" />
	<link rel="shortcut icon" href="/favicon.png" />
</svelte:head>
