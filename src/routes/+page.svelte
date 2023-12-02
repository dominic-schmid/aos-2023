<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { challenges } from '$lib/constants';
	import { Progress } from '$lib/components/ui/progress';
	import { Button } from '$lib/components/ui/button';
</script>

<svelte:head>
	<title>Advent of Svelte 2023</title>
	<meta name="author" content="Dominic Schmid" />
</svelte:head>

<div class="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
	{#each challenges as { day, name, rating }}
		<a href="/day-{day}">
			<Card.Root role="button" class="hover:bg-muted transition duration-300 ease-in-out">
				<Card.Header>
					<Card.Title class="flex items-start justify-between gap-x-8">
						<span>{name}</span>
						<span class="text-sm text-muted-foreground">~ {rating * 100}%</span>
					</Card.Title>
					<Card.Description>
						Day {day}
					</Card.Description>
				</Card.Header>
				<Card.Content>
					<Progress value={rating} max={1} />
				</Card.Content>
			</Card.Root>
		</a>
	{/each}
</div>

<hr class="my-8 max-w-3xl mx-auto" />

<div class="max-w-3xl mx-auto">
	<p class="text-center text-muted-foreground">
		Advent of Svelte 2023 is a collection of 25 challenges to help you learn Svelte.
		<br />
		Each challenge is designed to teach you a new concept in Svelte.
	</p>
	<p class="text-center text-muted-foreground -mt-1">
		You can find all the challenges for this website on
		<Button variant="link" href="https://advent.sveltesociety.dev/" class="px-0" target="_blank">
			SvelteSociety.dev
		</Button>
	</p>
</div>
