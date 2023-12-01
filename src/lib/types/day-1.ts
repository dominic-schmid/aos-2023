export type Day1APIResult = {
	name: string;
	tally: number;
};

export type Child = Day1APIResult & { type: 'nice' | 'naughty' };
