<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import { challenges } from '$lib/challenges';
	import { Progress } from '$lib/components/ui/progress';
	import NextChallenge from '$lib/components/challenges/NextChallenge.svelte';

	const secondsUntilMidnight = (new Date().setHours(24, 0, 0, 0) - Date.now()) / 1000;

	const today = new Date().getDate() + 1;
	const availableChallenges = challenges.filter((challenge) => challenge.day <= today);
</script>

<svelte:head>
	<title>My advent of Svelte 2023</title>
	<meta name="author" content="Dominic Schmid" />
</svelte:head>

<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
	{#each availableChallenges as { day, name, rating } (day)}
		<a href={rating > 0 ? `/day-${day}` : '#'}>
			<Card.Root class={rating > 0 ? 'hover:bg-muted transition duration-300 ease-in-out' : ''}>
				<Card.Header>
					<Card.Title class="flex items-start justify-between gap-x-8">
						<span class="font-christmas">{name}</span>
						<span class="text-sm text-muted-foreground">
							{rating === 1 || rating === 0 ? ' ' : '~ '}{rating * 100}%
						</span>
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

	<!-- Shows the next challenge -->
	<Card.Root class="border-dashed" aria-disabled="true">
		<Card.Header class="">
			<Card.Title class="text-muted-foreground font-christmas" tag="h5">
				Next challenge in
			</Card.Title>
		</Card.Header>
		<Card.Content class="text-xl md:text2xl font-bold">
			<NextChallenge countdown={secondsUntilMidnight} on:completed={() => alert('done')} />
		</Card.Content>
	</Card.Root>
</div>
