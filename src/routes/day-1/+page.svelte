<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { CheckCircled, CrossCircled, FileText, Plus } from 'radix-icons-svelte';
	import type { PageData } from './$types';
	import Table from './(components)/table.svelte';
	import Card from './(components)/card.svelte';
	import { useChildStore } from '$lib/stores/day-1';
	import AddChild from './(components)/add-child.svelte';
	import type { Child } from '$lib/types/day-1';

	export let data: PageData;
	$: ({ order, sortBy } = data);

	const children = useChildStore(data.children);

	let filterValue = '';

	function addChild(e: CustomEvent<Child>) {
		children.addChild(e.detail);
	}

	$: filtered = $children.filter((child) => {
		if (!filterValue) return true;
		return child.name.toLowerCase().includes(filterValue.toLowerCase());
	});
</script>

<h1 class="my-12">Day 1</h1>

<section class="grid grid-cols-2 md:grid-cols-3 gap-8">
	<Card>
		<span slot="title">Total children</span>
		<FileText class="h-5 w-5 text-blue-500" slot="icon" />
		<span>{$children.length}</span>
	</Card>
	<Card>
		<span slot="title">Nicest child</span>
		<CheckCircled class="h-5 w-5 text-green-500" slot="icon" />
		<span>{$children.sort((a, b) => b.tally - a.tally)[0].name}</span>
	</Card>
	<Card>
		<span slot="title">Naughtiest child</span>
		<CrossCircled class="h-5 w-5 text-red-500" slot="icon" />
		<span>{$children.sort((a, b) => a.tally - b.tally)[0].name}</span>
	</Card>
</section>

<section class="flex items-center py-4 gap-x-8 justify-between">
	<Input
		class="max-w-sm"
		placeholder="Filter children..."
		type="text"
		name="filter"
		bind:value={filterValue}
	/>

	<AddChild on:addChild={addChild} />
</section>

<section class="my-4">
	<Table children={filtered} {order} {sortBy} />
</section>
