<script lang="ts">
	import type { Day3APIResult } from '$lib/types/day-3';

	export let gift: Day3APIResult;
</script>

<div>
	<span>{gift.name}</span>
	<span>{gift.weight.toFixed(2)} kg</span>
</div>
