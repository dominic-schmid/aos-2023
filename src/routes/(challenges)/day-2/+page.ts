import { challenges } from '$lib/challenges';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	const challenge = challenges.find((c) => c.day === 2);

	if (!challenge) throw error(404, 'Challenge not found');
	return { challenge };
}) satisfies PageLoad;
