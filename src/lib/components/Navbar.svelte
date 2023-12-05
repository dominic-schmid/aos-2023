<script lang="ts">
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	import { Button } from '$lib/components/ui/button';
	import { GithubLogo } from 'radix-icons-svelte';
	import Container from './Container.svelte';
	import SvelteSanta from '$lib/assets/day-1/santa-svelte.png';
</script>

<nav
	class="p-4 supports-[backdrop-filter]:bg-background/60 dark:supports-[backdrop-filter]:bg-background/30 sticky top-0 z-30 border-b border-border/50 bg-background/95 shadow-sm backdrop-blur transition duration-500 ease-in-out"
>
	<Container>
		<div class="flex items-center justify-between gap-x-4">
			<a href="/" class="flex items-center gap-x-2 p-1 group">
				<img
					src={SvelteSanta}
					alt="Svelte Santa logo"
					class="w-10 h-10 object-contain hidden sm:block"
				/>
				<h3 class="relative font-christmas">
					<span
						class="group-hover:opacity-100 opacity-0 absolute top-0 left-0 text-sm text-muted-foreground font-normal group-hover:-translate-y-[calc(50%+4px)] transition duration-75 ease-in"
					>
						Dominics
					</span>
					Advent of Svelte 2023
				</h3>
			</a>
			<div class="flex items-center justify-evenly gap-x-4">
				<Button
					href="https://github.com/dominic-schmid/aos-2023"
					variant="ghost"
					size="icon"
					target="_blank"
				>
					<GithubLogo class="h-[1.2rem] w-[1.2rem]" />
				</Button>
				<ThemeSwitcher />
			</div>
		</div>
	</Container>
</nav>
