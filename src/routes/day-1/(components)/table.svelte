<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import * as Table from '$lib/components/ui/table';
	import type { Child } from '$lib/types/day-1';
	import { ArrowDown, ArrowUp } from 'radix-icons-svelte';
	import { fade } from 'svelte/transition';

	export let children: Child[];
	export let sortBy: string;
	export let order: string;
</script>

<div class="rounded-md border">
	<Table.Root>
		<Table.Header>
			<Table.Row>
				<Table.Head class="p-2">
					<Button variant="ghost" href="?sortBy=name&order={order === 'asc' ? 'desc' : 'asc'}">
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
					<Button variant="ghost" href="?sortBy=tally&order={order === 'asc' ? 'desc' : 'asc'}">
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
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each children as { name, tally, type }, i (i)}
				<Table.Row>
					<Table.Cell class="font-medium p-4">{name}</Table.Cell>
					<Table.Cell class="p-4">{type}</Table.Cell>
					<Table.Cell class="p-4 float-right">{tally}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
