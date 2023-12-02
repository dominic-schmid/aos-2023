<script lang="ts">
	import Metadata from '$lib/components/challenges/Metadata.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Minus, Plus, Trash } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import Counter from './(components)/Counter.svelte';
	import Canvas from './(components)/Canvas.svelte';
	import { cookies } from '$lib/stores/day-2';

	export let data: PageData;

	// let cookies = 0;

	const inc = () => $cookies++;
	const dec = () => $cookies--;
	const res = () => ($cookies = 0);
</script>

<Metadata challenge={data.challenge} />

<div class="flex items-center justify-between gap-x-8 sleigh-cursor mb-8">
	<h1>{data.challenge.name}: {$cookies}</h1>
	<!-- TODO -->
	<div class="flex justify-evenly items-center gap-x-4">
		<Button variant="outline" size="icon" on:click={dec}>
			<Minus />
		</Button>
		<Button variant="outline" size="icon" on:click={inc}>
			<Plus />
		</Button>
		<Button variant="destructive" size="icon" on:click={res}>
			<Trash />
		</Button>
	</div>
</div>

<!-- <Counter /> -->
<Canvas />
