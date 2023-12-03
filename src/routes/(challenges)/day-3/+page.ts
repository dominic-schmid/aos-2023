import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Day3APIResult } from '$lib/types/day-3';

const API_URL = 'https://advent.sveltesociety.dev/data/2023/day-three.json';

export const load = (async ({ parent, fetch }) => {
	const { challenge } = await parent();

	const res = await fetch(API_URL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) throw error(res.status, 'Failed to fetch day 3 data');

	const gifts = (await res.json()) as Day3APIResult[];

	return { challenge, gifts };
}) satisfies PageLoad;
