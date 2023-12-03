<script lang="ts">
	import type { Day3APIResult } from '$lib/types/day-3';

	export let gift: Day3APIResult;
</script>

<li class="flex items-center justify-between space-x-4">
	<span>{gift.name}</span>
	<small class="text-muted-foreground">{gift.weight.toFixed(2)} kg</small>
</li>
