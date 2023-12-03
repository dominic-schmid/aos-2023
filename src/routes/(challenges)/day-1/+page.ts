import type { PageLoad } from './$types';

export const load = (async ({ data, parent }) => {
	const { challenge } = await parent();
	const { children } = data;

	return { children, challenge };
}) satisfies PageLoad;
