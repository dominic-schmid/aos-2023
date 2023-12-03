<script lang="ts">
	import type { Trip } from '$lib/types/day-3';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Button } from '$lib/components/ui/button';
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { Cross1, Trash } from 'radix-icons-svelte';
	import { cn } from '$lib/utils';
	import Gift from './Gift.svelte';

	type Events = {
		select: null;
		clear: null;
		remove: null;
		autoFill: null;
	};
	const dispatch = createEventDispatcher<Events>();

	export let trip: Trip;
	export let index: number;
	export let active: boolean;

	let showGifts = false;
	const toggleGifts = () => (showGifts = !showGifts);

	const select = () => dispatch('select');
	const autoFill = () => dispatch('autoFill');
	const clear = () => dispatch('clear');
	const remove = () => {
		if (confirm('Are you sure you want to delete this trip? This cannot be undone!'))
			dispatch('remove');
	};
</script>

<div transition:fly>
	<Card.Root
		role="button"
		class={cn(
			'dark:hover:bg-muted/30 hover:bg-muted transition duration-300',
			active && 'border-success'
		)}
		on:click={select}
	>
		<Card.Header>
			<Card.Title class="flex items-center justify-between space-x-2">
				Trip #{index}
				<div class="flex items-center justify-evenly space-x-2.5">
					<Button on:click={autoFill}>Auto fill</Button>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" size="icon" on:click={clear}>
								<Cross1 class="w-4 h-4" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>Clear trip without deleting</Tooltip.Content>
					</Tooltip.Root>
					<Tooltip.Root>
						<Tooltip.Trigger asChild let:builder>
							<Button builders={[builder]} variant="destructive" size="icon" on:click={remove}>
								<Trash class="w-5 h-5" />
							</Button>
						</Tooltip.Trigger>
						<Tooltip.Content>Delete trip</Tooltip.Content>
					</Tooltip.Root>
				</div>
			</Card.Title>
			<!-- <Card.Description>Total weight: {trip.totalWeight}kg</Card.Description> -->
		</Card.Header>
		<Card.Content>
			<Button variant="link" on:click={toggleGifts} class="w-full flex justify-center"
				>Toggle gifts</Button
			>
			{#if showGifts}
				{#each trip.gifts as gift, i (i)}
					<Gift {gift} />
				{/each}
			{/if}
		</Card.Content>
		<Card.Footer>
			<small class="text-muted-foreground text-center w-full">
				{#if trip.gifts.length}
					<b>{trip.gifts.length}</b> gifts - <b>{trip.totalWeight.toFixed(2)}</b>kg
				{:else}
					Add some gifts to this trip!
				{/if}
			</small>
		</Card.Footer>
	</Card.Root>
</div>
