export type Pos = { x: number; y: number };
export type Board = { w: number; h: number };
export type Snake = {
	head: Pos;
	tail: Pos[];
	speed: Pos;
};

export enum GameState {
	Paused, // Game has started but not yet playing
	Playing,
	Stopped
}

export type CookieGame = {
	tileSize: number;
	tileCount: Pos;
	speed: number;
	snake: Snake;
	cookie: Pos;
	state: GameState;
};
