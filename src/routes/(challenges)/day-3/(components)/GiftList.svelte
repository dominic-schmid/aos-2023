<script lang="ts">
	import { Checkbox } from '$lib/components/ui/checkbox';
	import { Label } from '$lib/components/ui/label';
	import type { Day3APIResult } from '$lib/types/day-3';
	import { createEventDispatcher } from 'svelte';
	import TripGift from './TripGift.svelte';

	type Events = {
		select: null;
		deselect: null;
	};
	const dispatch = createEventDispatcher<Events>();

	export let gifts: Day3APIResult[];
	// export let disabled = false;

	function handleClick() {
		// TODO allow selecting invididual gifts for individual lists
	}
</script>

<ul class="space-y-2">
	{#each gifts as gift, index (index)}
		<TripGift {gift} boldNames />
		<!--<li class="flex items-center justify-between">
			
			 <div class="space-x-3">
				<Label for="checkbox-{index}" class="flex items-center space-x-2">
					<Checkbox
						name="checkbox-{index}"
						id="checkbox-{index}"
						{disabled}
						on:click={handleClick}
					/>
					<span>{gift.name}</span>
				</Label>
			</div>
			<span class="text-muted-foreground">{gift.weight.toFixed(2)} kg</span> 
		</li>-->
	{/each}
</ul>
