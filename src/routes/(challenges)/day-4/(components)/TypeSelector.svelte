<script lang="ts">
	import * as Select from '$lib/components/ui/select';
	import type { ChartDataType } from '$lib/types/day-4';

	export let type: ChartDataType = 'mock';

	const types: {
		value: ChartDataType;
		label: string;
	}[] = [
		{ value: 'mock', label: 'Mock data' },
		{ value: 'API', label: 'Real API data' }
	];
</script>

<Select.Root>
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
