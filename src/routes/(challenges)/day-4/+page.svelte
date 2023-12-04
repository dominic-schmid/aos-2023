<script lang="ts">
	import { DAY_4 } from '$lib/constants.js';
	import type { Day4APIResult, HeartRate } from '$lib/types/day-4.js';
	import { onMount } from 'svelte';
	import Chart from './(components)/Chart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pause, Resume } from 'radix-icons-svelte';

	export let data;

	let heartRates: HeartRate[] = [];
	let paused = false;

	onMount(() => {
		queryHeartRate();
		const interval = setInterval(queryHeartRate, 1000);

		return () => {
			clearInterval(interval);
		};
	});

	function queryHeartRate() {
		if (paused) return;
		console.log('querying heart rate...');
		heartRates = [
			...heartRates,
			{
				timestamp: new Date(),
				rate: Math.floor(Math.random() * (120 - 50 + 1) + 50)
			}
		];

		// fetch(DAY_4.apiRoute)
		// 	.then((res) => res.json())
		// 	.then((json) => {
		// 		try {
		// 			const hr = json as Day4APIResult;

		// 			results.push({
		// 				timestamp: new Date(),
		// 				rate: hr.heartRate
		// 			});
		// 		} catch (e) {
		// 			console.log('Failed to parse', e);
		// 		}
		// 	});
	}
</script>

<h1 class="font-christmas">{data.challenge.name}</h1>

<div class="flex items-start justify-between gap-x-8">
	<p class="text-muted-foreground mb-8 mt-2">
		Santas heart rate is being monitored. The elves are worried that he might be overworking
		himself. They want to track and react to any outliers!
	</p>
	<Button on:click={() => (paused = !paused)} variant={paused ? 'default' : 'outline'} size="icon">
		<Pause class="w-5 h-5 {paused ? 'hidden' : ''}" />
		<Resume class="w-5 h-5 {!paused ? 'hidden' : ''}" />
	</Button>
</div>

<Chart {heartRates} />

{#each heartRates as result (result.timestamp)}
	<div class="grid grid-cols-2 gap-8">
		<p>{result.timestamp.toLocaleString()}</p>
		<p>{result.rate}</p>
	</div>
{/each}
