<script lang="ts">
	import type { Trip as TripType } from '$lib/types/day-3.js';
	import { autoFillAll, autoFillTrip, greedy } from '$lib/utils/day-3';
	import { toast } from 'svelte-sonner';
	import GiftListHeader from './(components)/GiftListHeader.svelte';
	import Trip from './(components)/Trip.svelte';
	import TripHeader from './(components)/TripHeader.svelte';
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import { askConfirmations } from '$lib/stores/day-3';

	export let data;

	const limit = data.SLED_LIMIT;

	let remainingGifts = data.gifts;
	let trips: TripType[] = [];
	let selectedTrip: number | null = null;

	$: remainingWeight = remainingGifts.reduce((total, gift) => total + gift.weight, 0);
	$: totalTripWeights = trips.reduce((total, trip) => total + trip.totalWeight, 0);
	$: tripsWithGifts = trips.filter((trip) => trip.gifts.length);

	function fill(index: number) {
		const trip = trips[index];
		if (trip.totalWeight >= limit) {
			toast.error('Trip is already full!');
			return;
		}
		if (!remainingGifts.length) {
			toast.error('No gifts left to fill with!');
			return;
		}

		const before = trip.gifts.length;
		const newTrip = autoFillTrip(trip, remainingGifts, limit - trip.totalWeight);
		trips[index] = newTrip;
		remainingGifts = remainingGifts.filter((gift) => !newTrip.gifts.includes(gift));
		selectedTrip = null;

		if (before === newTrip.gifts.length) toast.warning(`No gifts were added to trip ${index + 1}!`);
		else toast.success(`Added ${newTrip.gifts.length - before} gifts to trip ${index + 1}!`);
	}

	function autoBalanceAllTrips() {
		if (!remainingGifts.length) {
			toast.error('No gifts left to auto-balance!');
			return;
		}

		if (
			$askConfirmations &&
			!confirm('This will clear all trips and auto-balance them again. Are you sure?')
		)
			return;

		trips = autoFillAll(data.gifts, data.SLED_LIMIT);
		remainingGifts = [];
		selectedTrip = null;
		toast.success(`Created and auto-balanced ${trips.length} trips!`);
	}

	function removeAllTrips() {
		if ($askConfirmations && !confirm('Are you sure you want to delete all trips?')) return;
		trips = [];
		remainingGifts = data.gifts;
		selectedTrip = null;
	}

	function addTrip() {
		trips = [...trips, { gifts: [], totalWeight: 0 }];
		selectedTrip = trips.length - 1;
	}

	function removeTrip(index: number) {
		remainingGifts = [...remainingGifts, ...trips[index].gifts];
		trips = [...trips.slice(0, index), ...trips.slice(index + 1)];
		selectedTrip = null;
	}

	const sort = () => (remainingGifts = greedy(remainingGifts));
</script>

<h1 class="font-christmas">{data.challenge.name}</h1>

<div class="flex items-start justify-between gap-x-8">
	<p class="text-muted-foreground mb-8 mt-2">
		Manually select gifts you want to add to a trip and move them using the arrow button. You can
		also create empty trips and have them be auto-filled by the system or generate trips and
		auto-fill them all at once!
	</p>
	<Label for="askConfirmations" class="flex items-center space-x-3">
		<Checkbox id="askConfirmations" bind:checked={$askConfirmations} />
		<span>Ask for confirmations before deleting?</span>
	</Label>
</div>

<div class="grid grid-cols-1 md:grid-cols-3 md:gap-16 space-y-8 md:space-y-0">
	<section>
		<GiftListHeader {remainingGifts} {remainingWeight} on:sort={sort} />
	</section>

	<section class="col-span-2">
		<TripHeader
			totalTrips={tripsWithGifts.length}
			totalWeight={totalTripWeights}
			on:addTrip={addTrip}
			on:autobalance={autoBalanceAllTrips}
			on:removeAll={removeAllTrips}
		/>

		{#if trips.length}<hr class="my-4 mx-16" />{/if}

		<ul class="grid grid-cols-1 xl:grid-cols-2 gap-4">
			{#each trips as trip, index (index)}
				<li>
					<Trip
						{trip}
						index={index + 1}
						active={selectedTrip === index}
						canAutofill={remainingGifts.length > 0 && trip.totalWeight < limit}
						on:select={() => (selectedTrip = index)}
						on:remove={() => removeTrip(index)}
						on:autoFill={() => fill(index)}
					/>
				</li>
			{/each}
		</ul>
	</section>
</div>
