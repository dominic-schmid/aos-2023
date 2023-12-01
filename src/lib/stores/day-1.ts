import type { Child } from '$lib/types/day-1';
import { persisted } from 'svelte-persisted-store';

export const useChildStore = (initialChildren?: Child[]) => {
	const { subscribe, update } = persisted<Child[]>('day-1-children', initialChildren ?? []);

	return {
		subscribe,
		addChild: (child: Child) => update((children) => [...children, child]),
		removeChild: (child: Child) =>
			update((children) => children.filter((c) => c.name !== child.name))
	};
};
