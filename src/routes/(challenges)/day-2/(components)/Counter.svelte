<script lang="ts">
	import Cookie from '$lib/assets/day-2/cookie.png';
	import { cookies } from '$lib/stores/day-2';
</script>

<div class="flex items-center justify-between gap-x-8 sleigh-cursor">
	<h1 class="my-12">{$cookies}</h1>
	<img src={Cookie} alt="Cookie" class="w-12 h-12" />
</div>
