import type { PageLoad } from './$types';
import type { Day3APIResult } from '$lib/types/day-3';
import { day3data } from './data';

// const API_URL = 'https://advent.sveltesociety.dev/data/2023/day-three.json';
const SLED_LIMIT = 100; // kg;

export const load = (async ({ parent /*, fetch*/ }) => {
	const { challenge } = await parent();

	// const res = await fetch(API_URL, {
	// 	method: 'GET',
	// 	headers: {
	// 		'Content-Type': 'application/json'
	// 	}
	// });
	// if (!res.ok) throw error(res.status, 'Failed to fetch day 3 data');
	// const gifts = (await res.json()) as Day3APIResult[];

	const gifts: Day3APIResult[] = day3data;

	return { challenge, gifts, SLED_LIMIT };
}) satisfies PageLoad;
