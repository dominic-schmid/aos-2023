import type { Challenge } from './types';

export const challenges: Challenge[] = [
	{
		day: 1,
		name: 'Naughty or nice',
		rating: 0.8
	},
	{
		day: 2,
		name: 'Cookie counter',
		rating: 0
	}
] as const;
