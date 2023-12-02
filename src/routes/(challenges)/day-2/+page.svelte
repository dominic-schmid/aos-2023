<script lang="ts">
	import Metadata from '$lib/components/challenges/Metadata.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Minus, Plus, Trash } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import Canvas from './(components)/Canvas.svelte';
	import { cookies } from '$lib/stores/day-2';

	export let data: PageData;

	// let cookies = 0;

	const inc = () => $cookies++;
	const dec = () => $cookies--;
	const res = () => ($cookies = 0);
</script>

<Metadata challenge={data.challenge} />

<Canvas />
