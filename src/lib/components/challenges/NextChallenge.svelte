<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	export let countdown: number;

	let timer: number;

	$: hours = Math.floor(countdown / 3600);
	$: minutes = Math.floor((countdown - hours * 3600) / 60);
	$: seconds = Math.floor(countdown - hours * 3600 - minutes * 60);

	onMount(() => {
		timer = setInterval(() => {
			countdown -= 1;
		}, 1000);
	});

	onDestroy(() => {
		clearInterval(timer);
	});

	$: {
		if (countdown === 0) {
			clearInterval(timer);
		}
	}

	const zeroPad = (num: number) => String(num).padStart(2, '0');
</script>

<span>{zeroPad(hours)} hours, {zeroPad(minutes)} mins, {zeroPad(seconds)} seconds</span>
