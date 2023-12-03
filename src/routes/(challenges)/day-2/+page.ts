import type { PageLoad } from './$types';

export const load = (async ({ parent }) => {
	const { challenge } = await parent();

	return { challenge };
}) satisfies PageLoad;
