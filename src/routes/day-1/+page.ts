import type { PageLoad } from './$types';

export const load = (async ({ data }) => {
	const children = data.children;

	return { children };
}) satisfies PageLoad;
