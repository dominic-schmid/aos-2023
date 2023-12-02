<script lang="ts">
	import '../app.pcss';
	import { Toaster } from 'svelte-sonner';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/Navbar.svelte';
	import Container from '$lib/components/Container.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<Toaster richColors />
<ModeWatcher />

<div>
	<Navbar />

	<Container>
		<main>
			<slot />
		</main>
	</Container>

	<Footer />
</div>
