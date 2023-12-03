import { persisted } from 'svelte-persisted-store';

export const askConfirmations = persisted<boolean>('day3-askConfirmation', true);
