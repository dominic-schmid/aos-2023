<script lang="ts">
	import Metadata from '$lib/components/challenges/Metadata.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<Metadata challenge={data.challenge} />
