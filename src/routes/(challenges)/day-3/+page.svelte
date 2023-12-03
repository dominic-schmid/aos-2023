<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Day3APIResult, Trip as TripType } from '$lib/types/day-3.js';
	import { autoFillAll, autoFillSled, greedy } from '$lib/utils/day-3';
	import { CaretSort, Plus, Trash } from 'radix-icons-svelte';
	import Trip from './(components)/Trip.svelte';
	import GiftList from './(components)/GiftList.svelte';
	import { toast } from 'svelte-sonner';
	import TripHeader from './(components)/TripHeader.svelte';

	export let data;

	const limit = data.SLED_LIMIT;

	let remainingGifts = data.gifts;
	let trips: TripType[] = [];
	let selectedTrip: number | null = null;

	let selectedGifts: Day3APIResult[] = [];
	$: selectedWeight = selectedGifts.reduce((total, gift) => total + gift.weight, 0);

	$: remainingWeight = remainingGifts.reduce((total, gift) => total + gift.weight, 0);
	$: totalTripWeights = trips.reduce((total, trip) => total + trip.totalWeight, 0);
	$: tripsWithGifts = trips.filter((trip) => trip.gifts.length);

	function addTrip() {
		trips = [...trips, { gifts: [], totalWeight: 0 }];
		selectedTrip = trips.length - 1;
	}

	function removeTrip(index: number) {
		trips = [...trips.slice(0, index), ...trips.slice(index + 1)];
	}

	const sort = () => (remainingGifts = greedy(remainingGifts));
	const canAdd = (gift: Day3APIResult) => selectedWeight + gift.weight <= limit;

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

	const removeAllTrips = () => {
		if (!confirm('Are you sure you want to delete all trips?')) return;
		trips = [];
		remainingGifts = data.gifts;
		selectedTrip = null;
	};

	function autoFillTrip(index: number) {
		if (trips[index].totalWeight >= limit) {
			toast.error('Trip is already full!');
			return;
		}
		if (!remainingGifts.length) {
			toast.error('No gifts left to fill with!');
			return;
		}

		const newTrip = autoFillSled(remainingGifts, limit - trips[index].totalWeight);
		trips[index] = newTrip;
		remainingGifts = remainingGifts.filter((gift) => !newTrip.gifts.includes(gift));
	}

	function autoBalanceAllTrips() {
		if (!remainingGifts.length) {
			toast.error('No gifts left to auto-balance!');
			return;
		}

		if (!confirm('This will clear all trips and auto-balance them again. Are you sure?')) return;

		trips = autoFillAll(data.gifts, data.SLED_LIMIT);
		remainingGifts = [];
	}
</script>

<div class="flex items-center justify-between gap-x-8">
	<h1 class="font-christmas">{data.challenge.name}</h1>
</div>
<p class="text-muted-foreground mb-8 mt-2">
	Manually select gifts you want to add to a trip and move them using the arrow button. You can also
	create empty trips and have them be auto-filled by the system or generate trips and auto-fill them
	all at once!
</p>

<div class="grid grid-cols-1 md:grid-cols-3 md:gap-16 space-y-8 md:space-y-0">
	<section>
		<Card.Root>
			<Card.Header>
				<Card.Title class="flex items-center space-x-4 justify-between">
					<span>Remaining gifts</span>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" size="icon" on:click={sort}>
								<CaretSort class="w-4 h-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>Sort gifts by weight in descending order</Tooltip.Content>
					</Tooltip.Root>
				</Card.Title>
				<Card.Description>
					{#if remainingGifts.length}
						You must fit the remaining
						<b>{remainingGifts.length}</b> gifts totaling <b>{remainingWeight.toFixed(2)} kg</b> on to
						trips!
					{:else}
						🎉 <b>Congratulations!</b> Every gift has a trip!
					{/if}
				</Card.Description>
			</Card.Header>
			<Card.Content>
				<GiftList gifts={remainingGifts} />
			</Card.Content>
		</Card.Root>
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
						on:select={() => (selectedTrip = index)}
						on:remove={() => removeTrip(index)}
						on:autoFill={() => autoFillTrip(index)}
					/>
				</li>
			{/each}
		</ul>
	</section>
</div>
