<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Table from '$lib/components/ui/table';
	import { useChildStore } from '$lib/stores/day-1';
	import type { Child } from '$lib/types/day-1';
	import { cn } from '$lib/utils';
	import { ArrowDown, ArrowUp, Minus, Plus, Trash } from 'radix-icons-svelte';
	import { toast } from 'svelte-sonner';
	import { fade } from 'svelte/transition';

	export let children: Child[];

	let sortBy: 'name' | 'tally' = 'tally';
	let order: 'asc' | 'desc' = 'asc';

	const childStore = useChildStore();

	function incTally(name: string) {
		childStore.incTally(name);
		toast.success(`${name} tally increased`);
	}

	function decTally(name: string) {
		childStore.decTally(name);
		toast.success(`${name} tally decreased`);
	}

	function del(name: string) {
		childStore.del(name);
		toast.success(`${name} deleted`);
	}

	function reSort(key: typeof sortBy) {
		if (key === sortBy) {
			order = order === 'asc' ? 'desc' : 'asc';
		} else {
			sortBy = key;
			order = 'asc';
		}
	}

	$: sorted = children.sort((a, b) => {
		if (sortBy === 'name') {
			if (order === 'asc') return a.name.localeCompare(b.name);
			return b.name.localeCompare(a.name);
		} else if (sortBy === 'tally') {
			if (order === 'asc') return a.tally - b.tally;
			return b.tally - a.tally;
		}
		return 0;
	});
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="p-2">
					<Button variant="ghost" on:click={() => reSort('name')}>
						Name
						{#if sortBy === 'name'}
							<div transition:fade>
								{#if order === 'asc'}
									<ArrowUp class="h-5 w-5 ml-2" />
								{:else}
									<ArrowDown class="h-5 w-5 ml-2" />
								{/if}
							</div>
						{/if}
					</Button>
				</Table.Head>
				<Table.Head class="p-2">Category</Table.Head>
				<Table.Head class="p-2 float-right">
					<Button variant="ghost" on:click={() => reSort('tally')}>
						Tally
						{#if sortBy === 'tally'}
							<div transition:fade>
								{#if order === 'asc'}
									<ArrowUp class="h-5 w-5 ml-2" />
								{:else}
									<ArrowDown class="h-5 w-5 ml-2" />
								{/if}
							</div>
						{/if}
					</Button>
				</Table.Head>
				<Table.Head class="p-2">Actions</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each sorted as { name, tally, type }, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium p-4">{name}</Table.Cell>
					<Table.Cell class="p-4">{type}</Table.Cell>
					<Table.Cell class="p-4 float-right">{tally}</Table.Cell>

					<Table.Cell class="p-4 w-[150px] border-l ">
						<div class="flex justify-evenly items-center gap-x-4">
							<Button variant="outline" size="icon" on:click={() => decTally(name)}>
								<Minus />
							</Button>
							<Button variant="outline" size="icon" on:click={() => incTally(name)}>
								<Plus />
							</Button>
							<Button variant="destructive" size="icon" on:click={() => del(name)}>
								<Trash />
							</Button>
						</div>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
