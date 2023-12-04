<script lang="ts">
	import SimpleStatCard from '$lib/components/cards/SimpleStatCard.svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { useChildStore } from '$lib/stores/day-1';
	import { CheckCircled, CrossCircled, FileText } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import type { PageData } from './$types';
	import AddChild from './(components)/add-child.svelte';
	import Table from './(components)/table.svelte';

	export let data: PageData;
	const children = useChildStore(data.children);

	function resetAll() {
		children.set(data.children);
		filterValue = '';
		toast.success('All children have been reset to their original state!');
	}

	let filterValue = '';

	$: filtered = $children.filter((child) => {
		let show = !filterValue;
		if (child.name.toLowerCase().includes(filterValue.toLowerCase())) show = true;
		if (child.tally.toString().includes(filterValue)) show = true;
		if (child.type.toLowerCase().includes(filterValue.toLowerCase())) show = true;
		return show;
	});

	$: nicest = $children.sort((a, b) => b.tally - a.tally)[0];
	$: naughtiest = $children.sort((a, b) => a.tally - b.tally)[0];
</script>

<div class="flex items-center justify-between gap-x-8 mb-8">
	<h1 class="font-christmas">{data.challenge.name}</h1>
	<Button variant="link" on:click={resetAll}>Reset all</Button>
</div>

<section class="grid grid-cols-2 md:grid-cols-3 gap-8">
	<SimpleStatCard>
		<span slot="title">Total children</span>
		<FileText class="h-5 w-5 text-blue-500" slot="icon" />
		<span>{$children.length}</span>
	</SimpleStatCard>
	<SimpleStatCard>
		<span slot="title">Nicest child</span>
		<CheckCircled class="h-5 w-5 text-green-500" slot="icon" />
		<span>{nicest.name}</span>
	</SimpleStatCard>
	<SimpleStatCard>
		<span slot="title">Naughtiest child</span>
		<CrossCircled class="h-5 w-5 text-red-500" slot="icon" />
		<span>{naughtiest.name}</span>
	</SimpleStatCard>
</section>

<section class="flex items-center py-4 gap-x-8 justify-between">
	<Input
		class="max-w-sm"
		placeholder="Filter children by name, category or tally"
		type="text"
		name="filter"
		bind:value={filterValue}
	/>
	<AddChild />
</section>

<section class="my-4">
	<Table children={filtered} />
</section>
