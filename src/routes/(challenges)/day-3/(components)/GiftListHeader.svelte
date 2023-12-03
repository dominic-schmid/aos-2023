<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import type { Day3APIResult } from '$lib/types/day-3';
	import { CaretSort } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import GiftList from './GiftList.svelte';

	type Events = {
		sort: null;
	};
	const dispatch = createEventDispatcher<Events>();

	export let remainingGifts: Day3APIResult[];
	export let remainingWeight: number;

	const sort = () => dispatch('sort');
</script>

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
				<b>{remainingGifts.length}</b> gifts totaling <b>{remainingWeight.toFixed(2)} kg</b> on to trips!
			{:else}
				🎉 <b>Congratulations!</b> Every gift has a trip!
			{/if}
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<GiftList gifts={remainingGifts} />
	</Card.Content>
</Card.Root>
