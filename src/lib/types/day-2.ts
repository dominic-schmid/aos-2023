export type Pos = { x: number; y: number };
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
