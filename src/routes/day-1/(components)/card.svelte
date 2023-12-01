<script lang="ts">
	import * as Card from '$lib/components/ui/card';
</script>

<Card.Root role="button" class="hover:bg-muted transition duration-300 ease-in-out">
	<Card.Header>
		<Card.Description>
			<div class="flex justify-between items-center gap-x-4">
				<slot name="title" />
				<slot name="icon" />
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<p class="font-bold text-2xl">
			<slot />
		</p>
	</Card.Content>
</Card.Root>
