<script lang="ts">
	import Metadata from '$lib/components/challenges/Metadata.svelte';

	export let data;
</script>

<Metadata challenge={data.challenge} />

<div class="pt-2">
	<slot />
</div>
