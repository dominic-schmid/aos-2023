<script lang="ts">
	import * as Sheet from '$lib/components/ui/sheet';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { Plus } from 'radix-icons-svelte';
	import { createEventDispatcher } from 'svelte';
	import type { Child } from '$lib/types/day-1';
	import { enhance } from '$app/forms';

	const dispatch = createEventDispatcher<{ addChild: Child }>();

	function addChild() {
		dispatch('addChild', { name, tally, type });
	}

	let name = '';
	let tally = 0;
	let type: 'nice' | 'naughty' = 'nice';
	$: type = tally >= 0 ? 'nice' : 'naughty';
</script>

<form use:enhance>
	<Sheet.Root>
		<Sheet.Trigger asChild let:builder>
			<Button builders={[builder]} variant="outline">
				Add child
				<Plus class="h-5 w-5 ml-2 " />
			</Button>
		</Sheet.Trigger>
		<Sheet.Content side="right">
			<Sheet.Header>
				<Sheet.Title>Add child</Sheet.Title>
				<Sheet.Description>
					Add a new child here by providing their name and initial tally.
				</Sheet.Description>
			</Sheet.Header>
			<div class="grid gap-4 py-4">
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="name" class="text-right">Name</Label>
					<Input
						id="name"
						placeholder="Add the childs name..."
						class="col-span-3"
						bind:value={name}
						required
					/>
				</div>
				<div class="grid grid-cols-4 items-center gap-4">
					<Label for="tally" class="text-right">Tally</Label>
					<Input
						id="tally"
						type="number"
						bind:value={tally}
						placeholder="Insert number..."
						class="col-span-3"
						required
					/>
				</div>
			</div>
			<Sheet.Footer>
				<Sheet.Close asChild let:builder>
					<Button builders={[builder]} type="submit" on:click={addChild}>Save changes</Button>
				</Sheet.Close>
			</Sheet.Footer>
		</Sheet.Content>
	</Sheet.Root>
</form>
