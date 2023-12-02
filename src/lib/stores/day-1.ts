import type { Child } from '$lib/types/day-1';
import { persisted } from 'svelte-persisted-store';

export const useChildStore = (initialChildren?: Child[]) => {
	const { subscribe, update, set } = persisted<Child[]>('day-1-children', initialChildren ?? []);

	return {
		subscribe,
		set,
		addChild: (child: Child) => update((children) => [...children, child]),
		removeChild: (child: Child) =>
			update((children) => children.filter((c) => c.name !== child.name)),
		incTally: (name: string) =>
			update((children) => {
				const childIndex = children.findIndex((c) => c.name === name);
				children[childIndex].tally += 1;
				if (children[childIndex].tally >= 0) children[childIndex].type = 'nice';
				return children;
			}),
		decTally: (name: string) =>
			update((children) => {
				const childIndex = children.findIndex((c) => c.name === name);
				children[childIndex].tally -= 1;
				if (children[childIndex].tally < 0) children[childIndex].type = 'naughty';
				return children;
			}),
		del: (name: string) => update((children) => children.filter((c) => c.name !== name))
	};
};
