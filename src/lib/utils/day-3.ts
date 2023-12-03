import type { Day3APIResult, Trip } from '$lib/types/day-3';

// Greedy sorts the gifts by weight, from heaviest to lightest.
// This is the simplest solution, but it's not the most efficient, but it's a good starting point.
// You then simply need to iterate over the gifts and add them to the sleigh until you reach the weight limit or run out of gifts.
export function greedy(gifts: Day3APIResult[]): Day3APIResult[] {
	const greedy = gifts.slice().sort((a, b) => b.weight - a.weight);
	return greedy;
}

// Iterates over the list one time and for every gift it adds it to the first trip that has enough space.
// Since the trips are sorted by weight descending, the first trip will have all the heaviest gifts.
export function autoSortAll(gifts: Day3APIResult[], alreadySorted = false): Trip[] {
	const sorted = alreadySorted ? gifts : greedy(gifts);
	const trips: Trip[] = [];

	for (let i = 0; i < sorted.length; i++) {
		const gift = sorted[i];
		let trip = trips.find((t) => t.totalWeight + gift.weight <= 10);
		if (!trip) {
			trip = { gifts: [], totalWeight: 0 };
			trips.push(trip);
		}
		trip.gifts.push(gift);
		trip.totalWeight += gift.weight;
	}

	return trips;
}

export function autoSortOne(remainingGifts: Day3APIResult[], alreadySorted = false): Trip {
	const sorted = alreadySorted ? remainingGifts : greedy(remainingGifts);
	const trip: Trip = { gifts: [], totalWeight: 0 };

	for (const gift of sorted) {
		if (trip.totalWeight + gift.weight <= 100) {
			trip.gifts.push(gift);
			trip.totalWeight += gift.weight;
		}
		if (trip.totalWeight === 100) break;
	}

	return trip;
}
