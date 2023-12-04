<script lang="ts">
	import { DAY_4 } from '$lib/constants.js';
	import type { ChartDataType, Day4APIResult, HeartRate } from '$lib/types/day-4.js';
	import { onMount } from 'svelte';
	import Chart from './(components)/Chart.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Pause, Resume } from 'radix-icons-svelte';
	import Stats from './(components)/Stats.svelte';
	import TypeSelector from './(components)/TypeSelector.svelte';

	export let data;
	let paused = false;

	let heartRates: HeartRate[] = [];
	let dataType: ChartDataType = 'mock';

	// $: latestMeasurement = heartRates.length ? heartRates[heartRates.length - 1] : null;

	onMount(() => {
		queryHeartRate();
		const interval = setInterval(queryHeartRate, 6 * 1000);
		return () => {
			clearInterval(interval);
		};
	});

	function queryHeartRate() {
		if (paused) return;
		if (dataType === 'mock') {
			getMock();
		} else if (dataType === 'API') {
			getFromAPI();
		}
	}

	function getMock() {
		heartRates = [
			...heartRates,
			{
				timestamp: new Date(),
				rate: Math.floor(Math.random() * (120 - 50 + 1) + 50)
			}
		];
	}

	function getFromAPI() {
		fetch(DAY_4.apiRoute)
			.then((res) => res.json())
			.then((json) => {
				try {
					const hr = json as Day4APIResult;
					heartRates = [
						...heartRates,
						{
							timestamp: new Date(),
							rate: hr.heartRate
						}
					];
				} catch (e) {
					console.log('Failed to parse', e);
				}
			});
	}
</script>

<h1 class="font-christmas">{data.challenge.name}</h1>

<div class="flex items-start justify-between gap-x-8">
	<p class="text-muted-foreground mb-8 mt-2">
		Santas heart rate is being monitored. The elves are worried that he might be overworking
		himself. They want to track and react to any outliers!
	</p>
	<div class="flex items-center justify-evenly space-x-2 flex-nowrap">
		<TypeSelector bind:type={dataType} />
		<Button
			on:click={() => (paused = !paused)}
			variant={paused ? 'default' : 'outline'}
			size="icon"
			class="flex-shrink-0"
		>
			<Pause class="w-5 h-5 {paused ? 'hidden' : ''}" />
			<Resume class="w-5 h-5 {!paused ? 'hidden' : ''}" />
		</Button>
	</div>
</div>

<Stats {heartRates} />

<Chart {heartRates} />

<!-- {#if latestMeasurement}
	<section class="mt-8">
		<div class="grid grid-cols-3 gap-8 text-center">
			<p class="font-bold">Latest measurement</p>
			<p>{latestMeasurement.timestamp.toLocaleString()}</p>
			<p>{latestMeasurement.rate}</p>
		</div>
	</section>
{/if} -->
