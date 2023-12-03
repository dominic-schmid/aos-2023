<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	export let data;
</script>

<div class="flex items-center justify-between gap-x-8 mb-8">
	<h1 class="font-christmas">{data.challenge.name}</h1>
	<Button variant="link">Reset all</Button>
</div>

<pre>{JSON.stringify(data, null, 4)}</pre>
