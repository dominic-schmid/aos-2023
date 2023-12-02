import { challenges } from '$lib/challenges';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	const children = data.children;
	const challenge = challenges.find((c) => c.day === 1);

	if (!challenge) throw error(404, 'Challenge not found');

	return { children, challenge };
}) satisfies PageLoad;
