import { challenges } from '$lib/challenges';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load = (async ({ route }) => {
	const [id] = route.id.split('-').reverse();
	const challenge = challenges.find((c) => c.day === Number(id));
	if (!challenge) throw error(404, `Challenge "${id}" not found!`);

	return { challenge };
}) satisfies LayoutLoad;
