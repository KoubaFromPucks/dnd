import { type Stats } from './stats';

export type ThrowParams = {
	throwsCount: number;
	diceSides: number;
	bonusMode?: number;
	scalingStat?: keyof Stats;
}; // e.g., 1d8 + 3 strength
