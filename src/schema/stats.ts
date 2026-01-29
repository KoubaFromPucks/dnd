import { z } from 'zod';

export const POSSIBLE_STATS = [
	'strength',
	'dexterity',
	'constitution',
	'intelligence',
	'wisdom',
	'charisma'
] as const;

export const statsSchema = z.object({
	strength: z.number(),
	dexterity: z.number(),
	constitution: z.number(),
	intelligence: z.number(),
	wisdom: z.number(),
	charisma: z.number()
});

export type Stats = z.infer<typeof statsSchema>;
