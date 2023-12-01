<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	const days = [...Array(24).keys()].map((i) => i + 1);
</script>

<h2 class="text-center my-8">All days</h2>
<ol class="grid grid- grid-cols-2 gap-4 list-disc">
	{#each days as day}
		<li>
			<Button class="px-1" variant="link" href="/day-{day}" size="lg">Day {day}</Button>
		</li>
	{/each}
</ol>
