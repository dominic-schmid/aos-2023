<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Day3APIResult, Trip as TripType } from '$lib/types/day-3.js';
	import { autoSortAll, greedy } from '$lib/utils/day-3';
	import { ArrowRight, Plus } from 'radix-icons-svelte';
	import Trip from './(components)/Trip.svelte';

	export let data;

	const limit = data.SLED_LIMIT;

	let remainingGifts = data.gifts;
	let trips: TripType[] = [];
	let selectedTrip: number | null = null;

	let selectedGifts: Day3APIResult[] = [];
	$: selectedWeight = selectedGifts.reduce((total, gift) => total + gift.weight, 0);

	$: remainingWeight = remainingGifts.reduce((total, gift) => total + gift.weight, 0);
	$: totalTripWeights = trips.reduce((total, trip) => total + trip.totalWeight, 0);

	function addTrip() {
		trips = [...trips, { gifts: [], totalWeight: 0 }];
	}

	function removeTrip(index: number) {
		trips = [...trips.slice(0, index), ...trips.slice(index + 1)];
	}

	function autoBalance() {
		trips = autoSortAll(data.gifts);
		remainingGifts = [];
	}

	const sort = () => (remainingGifts = greedy(remainingGifts));
	const canAdd = (gift: Day3APIResult) => selectedWeight + gift.weight <= limit;
	const reset = () => (trips = []) && (remainingGifts = data.gifts);

	function handleGiftCheck(index: number) {
		const gift = remainingGifts[index];
		if (!gift) return;

		const existingIndex = selectedGifts.indexOf(gift);
		if (existingIndex < 0) {
			selectedGifts = [...selectedGifts, gift]; // "check"
		} else {
			selectedGifts = [
				...selectedGifts.slice(0, existingIndex),
				...selectedGifts.slice(existingIndex + 1)
			]; // "uncheck"
		}
	}
</script>

<div class="flex items-center justify-between gap-x-8">
	<h1 class="font-christmas">{data.challenge.name}</h1>

	<div class="space-x-2">
		<Button variant="outline" on:click={autoBalance}>Auto-balance all</Button>
		<Button variant="link" on:click={reset}>Reset all</Button>
	</div>
</div>
<p class="text-muted-foreground mb-8 mt-2">
	Manually select gifts you want to add to a trip and move them using the arrow button. You can also
	create empty trips and have them be auto-filled by the system or generate trips and auto-fill them
	all at once!
</p>

<div class="flex gap-x-16 justify-between">
	<section class="flex-grow">
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center space-x-4 justify-between">
					<span>Remaining gifts</span>
					<Button variant="link" on:click={sort}>Sort desc</Button>
				</Card.Title>
				<Card.Description>
					You must fit the remaining
					<b>{remainingGifts.length}</b> gifts totaling <b>{remainingWeight} kg</b> on to trips!
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<ul class="space-y-2">
					{#each remainingGifts as gift, index (index)}
						<li class="flex items-center justify-between">
							<div class="space-x-3">
								<Label for="checkbox-{index}" class="flex items-center space-x-2">
									<Checkbox
										name="checkbox-{index}"
										id="checkbox-{index}"
										on:click={() => handleGiftCheck(index)}
										disabled={!canAdd(gift)}
									/>
									<span>{gift.name}</span>
								</Label>
							</div>
							<span class="text-muted-foreground">{gift.weight.toFixed(2)} kg</span>
						</li>
					{/each}
				</ul>
			</Card.Content>
		</Card.Root>
	</section>

	<section class="flex-shrink">
		<h5>Actions</h5>

		<div>
			<Button variant="outline" size="icon" on:click={addTrip}>
				<ArrowRight class="w-5 h-5" />
			</Button>
		</div>

		<span>{selectedWeight.toFixed(2)} kg</span>
		<!-- action btutons -->
	</section>

	<section class="flex-grow">
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center space-x-4 justify-between">
					<span>Trips</span>
					<Button variant="outline" size="icon" on:click={addTrip}>
						<Plus class="w-5 h-5" />
					</Button>
				</Card.Title>
				<Card.Description>
					Moving a total of <b>{totalTripWeights.toFixed(2)} kg</b> on <b>{trips.length}</b> trips!
				</Card.Description>
			</Card.Header>
		</Card.Root>
		{#if trips.length}<hr class="my-4 mx-16" />{/if}

		<ul class="space-y-4 mt-4">
			{#each trips as trip, index (index)}
				<li>
					<Trip
						{trip}
						index={index + 1}
						active={selectedTrip === index}
						on:select={() => (selectedTrip = index)}
					/>
				</li>
			{/each}
		</ul>
	</section>
</div>

<!-- <pre>{JSON.stringify(data, null, 4)}</pre> -->
