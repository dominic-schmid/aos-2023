import type { Child /* Day1APIResult */ } from '$lib/types/day-1';
// import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { apiChildren } from './children';

// const API_URL = 'https://advent.sveltesociety.dev/data/2023/day-one.json';

export const load = (async (/*{ fetch }*/) => {
	// const res = await fetch(API_URL, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });

	// if (!res.ok) throw error(res.status, 'Failed to fetch day 1 data');

	// const apiChildren = (await res.json()) as Day1APIResult[];

	const children = apiChildren.map((child) =>
		child.tally > 0 ? { ...child, type: 'nice' } : { ...child, type: 'naughty' }
	) as Child[];

	return { children };
}) satisfies PageServerLoad;
