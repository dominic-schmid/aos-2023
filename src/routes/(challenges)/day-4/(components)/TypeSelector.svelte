<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { ChartDataType } from '$lib/types/day-4';

	export let dataType: ChartDataType = 'mock';

	const types: SelectType[] = [
		{ value: 'mock', label: 'Mock data' },
		{ value: 'API', label: 'Real API data' }
	];

	let selected: SelectType = types[0];

	type SelectType = {
		value: ChartDataType;
		label: string;
	};

	function handleSelect(item: any) {
		console.log(item);
		try {
			const newSelection = item as SelectType;
			dataType = newSelection.value;
		} catch (err) {
			console.error('Could not hard cast item to ChartDataType in type selector');
		}
	}
</script>

<Select.Root {selected} onSelectedChange={handleSelect}>
	<Select.Trigger class="w-[220px]">
		<Select.Value placeholder="Select chart data type" />
	</Select.Trigger>
	<Select.Content>
		<Select.Group>
			<Select.Label>Types</Select.Label>
			{#each types as { label, value } (value)}
				<Select.Item {value} {label}>{label}</Select.Item>
			{/each}
		</Select.Group>
	</Select.Content>
	<Select.Input name="favoriteFruit" />
</Select.Root>
