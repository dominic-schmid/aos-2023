import type { Child, Day1APIResult } from '$lib/types/day-1';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

const API_URL = 'https://advent.sveltesociety.dev/data/2023/day-one.json';

export const load = (async ({ fetch, url }) => {
	const res = await fetch(API_URL, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!res.ok) throw error(res.status, 'Failed to fetch day 1 data');

	const apiChildren = (await res.json()) as Day1APIResult[];

	const children = apiChildren.map((child) =>
		child.tally > 0 ? { ...child, type: 'nice' } : { ...child, type: 'naughty' }
	) as Child[];

	console.log(new Date().toISOString(), children.length);

	const sortBy = url.searchParams.get('sortBy') ?? 'tally';
	const order = url.searchParams.get('order') ?? 'desc';

	if (sortBy === 'name')
		children.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

	if (sortBy === 'tally') children.sort((a, b) => a.tally - b.tally);

	if (order === 'desc') children.reverse();

	return {
		children,
		sortBy,
		order
	};
}) satisfies PageLoad;
