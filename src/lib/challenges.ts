import type { Challenge } from './types';

export const challenges: Challenge[] = [
	{
		day: 1,
		name: 'Naughty or nice',
		rating: 0.8
	},
	{
		day: 2,
		name: 'Hungry Santa',
		rating: 0.8
	}
] as const;