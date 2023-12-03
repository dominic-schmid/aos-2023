<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { Plus, Trash } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';

	type Events = {
		autobalance: null;
		addTrip: null;
		removeAll: null;
	};
	const dispatch = createEventDispatcher<Events>();

	export let totalWeight: number;
	export let totalTrips: number;

	const addTrip = () => dispatch('addTrip');
	const removeAll = () => dispatch('removeAll');
	const autoBalance = () => dispatch('autobalance');
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="flex items-center space-x-4 justify-between">
			<span>Trips</span>
			<div class="flex items-center space-x-2 justify-evenly">
				<Button variant="default" on:click={autoBalance}>Auto-balance all</Button>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button builders={[builder]} variant="outline" size="icon" on:click={addTrip}>
							<Plus class="w-5 h-5" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Add a new trip</Tooltip.Content>
				</Tooltip.Root>
				<Tooltip.Root>
					<Tooltip.Trigger asChild let:builder>
						<Button builders={[builder]} variant="destructive" size="icon" on:click={removeAll}>
							<Trash class="w-5 h-5" />
						</Button>
					</Tooltip.Trigger>
					<Tooltip.Content>Delete all trips</Tooltip.Content>
				</Tooltip.Root>
			</div>
		</Card.Title>
		<Card.Description>
			Moving a total of <b>{totalWeight.toFixed(2)} kg</b> on
			<b>{totalTrips}</b> trips!
		</Card.Description>
	</Card.Header>
</Card.Root>
