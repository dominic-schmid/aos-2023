<script lang="ts">
	import type { HeartRate } from '$lib/types/day-4';
	import { Line } from 'svelte-chartjs';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale,
		Filler,
		type ChartData
	} from 'chart.js';
	import { onMount } from 'svelte';

	ChartJS.register(
		Title,
		Tooltip,
		Legend,
		Filler,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	);

	export let heartRates: HeartRate[];

	let chart: ChartJS<'line', number[], unknown>;

	const data: ChartData<'line', number[], unknown> = {
		labels: [],
		datasets: [
			{
				label: 'Heart rate',
				showLine: true,
				fill: true,
				tension: 0.3,
				backgroundColor: 'rgba(225, 204,230, .3)',
				borderColor: 'rgb(205, 130, 158)',
				borderCapStyle: 'butt',
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: 'miter',
				pointBorderColor: 'rgb(205, 130,1 58)',
				pointBackgroundColor: 'rgb(255, 255, 255)',
				pointBorderWidth: 10,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: 'rgb(0, 0, 0)',
				pointHoverBorderColor: 'rgba(220, 220, 220,1)',
				pointHoverBorderWidth: 2,
				pointRadius: 0,
				pointHitRadius: 10,
				data: []
			}
		]
	};

	onMount(() => {});

	$: if (data && chart && heartRates) {
		chart.data.datasets[0].data = heartRates.map((result) => result.rate);
		chart.data.xLabels = heartRates.map((result) => result.timestamp.toLocaleTimeString());
		chart.update();
	}
</script>

<Line {data} options={{ responsive: true }} bind:chart />
