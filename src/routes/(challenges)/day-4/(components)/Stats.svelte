<script lang="ts">
	import type { HeartRate } from '$lib/types/day-4';
	import SimpleStatCard from '$lib/components/cards/SimpleStatCard.svelte';
	import { CaretDown, CaretUp, Layers, ViewNone } from 'radix-icons-svelte';
	import { cn } from '$lib/utils';

	export let heartRates: HeartRate[];

	// $: averageHeartRate = heartRates.reduce((acc, curr) => acc + curr.rate, 0) / heartRates.length;
	// $: measurementTimespan = getMeasurementTimespan(heartRates);

	// const getMeasurementTimespan = (rates: HeartRate[]) => {
	// 	const sortedTimestamps = rates
	// 		.map((hr) => hr.timestamp)
	// 		.sort((a, b) => a.getTime() - b.getTime());
	// 	if (sortedTimestamps.length < 2) return 0;
	// 	return sortedTimestamps[sortedTimestamps.length - 1].getTime() - sortedTimestamps[0].getTime(); // milliseconds
	// };

	function formatMilliseconds(ms: number) {
		let timeStr = '';
		if (ms < 1000 * 60) {
			timeStr = `${Math.floor(ms / 1000)}`;
			timeStr += timeStr === '1' ? ' second' : ' seconds';
		} else if (ms < 1000 * 60 * 60) {
			timeStr = `${Math.floor(ms / 1000 / 60)}`;
			timeStr += timeStr === '1' ? ' minute' : ' minutes';
			timeStr = `~${timeStr}`;
		}
		return timeStr;
	}

	function getStats(rates: HeartRate[]) {
		let avg, min, max, timespanMs, firstTimestamp, lastTimestamp;
		avg = min = max = timespanMs = firstTimestamp = lastTimestamp = 0;

		if (!rates.length) return { avg, min, max, timespanMs };
		avg = min = max = rates[0].rate;
		firstTimestamp = lastTimestamp = rates[0].timestamp.getTime();

		for (const rate of rates) {
			avg += rate.rate;
			min = Math.min(min, rate.rate);
			max = Math.max(max, rate.rate);
			firstTimestamp = Math.min(firstTimestamp, rate.timestamp.getTime());
			lastTimestamp = Math.max(lastTimestamp, rate.timestamp.getTime());
		}

		avg /= rates.length;
		timespanMs = lastTimestamp - firstTimestamp;

		return { avg, min, max, timespanMs };
	}

	$: ({
		avg: averageHeartRate,
		min: minHeartRate,
		max: maxHeartRate,
		timespanMs: measurementTimespan
	} = getStats(heartRates));
	$: heartRateColor = averageHeartRate < 50 ? 'text-red-500' : 'text-green-500';
</script>

<section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-6">
	<SimpleStatCard>
		<span slot="title">Average heart rate</span>
		<ViewNone slot="icon" class="w-5 h-5 {heartRateColor}" />
		<span class="whitespace-nowrap">
			{averageHeartRate.toFixed(2)}
			<small class="text-xs text-muted-foreground">bpm</small>
		</span>
	</SimpleStatCard>
	<SimpleStatCard>
		<span slot="title">Measurements</span>
		<Layers slot="icon" class="w-5 h-5 text-purple-700" />
		<span class="whitespace-nowrap">
			{heartRates.length}
			<small class="text-xs text-muted-foreground">
				in {formatMilliseconds(measurementTimespan)} range
			</small>
		</span>
	</SimpleStatCard>
	<SimpleStatCard>
		<span slot="title">Minimum</span>
		<CaretDown slot="icon" class="w-5 h-5 text-blue-600" />
		<span class="whitespace-nowrap">
			{Math.floor(minHeartRate)}
			<small class="text-xs text-muted-foreground">bpm</small>
		</span>
	</SimpleStatCard>
	<SimpleStatCard>
		<span slot="title">Maximum</span>
		<CaretUp slot="icon" class="w-5 h-5 text-red-500" />
		<span class="whitespace-nowrap">
			{Math.floor(maxHeartRate)}
			<small class="text-xs text-muted-foreground">bpm</small>
		</span>
	</SimpleStatCard>
</section>
