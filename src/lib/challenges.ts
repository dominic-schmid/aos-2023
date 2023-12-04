import type { Challenge } from './types';

// I know i could take the index but since I may be skipping days at some point I add it manually
export const challenges: Challenge[] = [
	{ day: 1, name: 'Naughty or nice', rating: 0.8 },
	{ day: 2, name: 'Hungry Santa', rating: 0.95 },
	{ day: 3, name: 'Sled Load Balancer', rating: 0.95 },
	{ day: 4, name: 'Heart rate monitor', rating: 0 }
] as const;
