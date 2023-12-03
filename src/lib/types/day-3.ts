export type Day3APIResult = {
	name: string;
	weight: number;
};

export type Trip = {
	gifts: Day3APIResult[];
	totalWeight: number;
};
