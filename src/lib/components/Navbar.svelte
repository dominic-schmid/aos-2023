<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { Button } from '$lib/components/ui/button';
	import { GithubLogo } from 'radix-icons-svelte';
	import Container from './Container.svelte';
</script>

<nav class="p-4 bg-primary-foreground sticky top-0 shadow-lg rounded-sm">
	<Container>
		<div class="flex items-center justify-between gap-x-4">
			<a href="/" class="px-4 py-1">
				<h3>Advent of Svelte 2023</h3>
			</a>
			<div class="flex items-center justify-evenly gap-x-4">
				<Button href="https://github.com/dominic-schmid" variant="ghost" size="icon">
					<GithubLogo class="h-[1.2rem] w-[1.2rem]" />
				</Button>
				<ThemeSwitcher />
			</div>
		</div>
	</Container>
</nav>
