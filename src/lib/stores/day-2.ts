import { GameState, type CookieGame } from '$lib/types/day-2';
import { writable } from 'svelte/store';

export const cookies = writable(0);

const initialState: CookieGame = {
	tileSize: 16, // px
	tileCount: { x: 20, y: 20 },
	speed: 15, // fps
	snake: {
		head: { x: 5, y: 5 },
		tail: [],
		speed: { x: 0, y: 0 }
	},
	cookie: { x: 2, y: 2 },
	state: GameState.Paused
};

const gStore = writable<CookieGame>(initialState);

export const cookieGameStore = () => {
	const { subscribe, set, update } = gStore;

	function die() {
		update((g) => {
			g.state = GameState.Stopped;
			return g;
		});
	}

	// Request a reset of the params you add
	function restart(config?: Partial<CookieGame>, state: GameState = GameState.Paused) {
		update((g) => ({ ...g, ...config, state }));
	}

	return {
		subscribe,
		set,
		restart,
		die
	};
};
